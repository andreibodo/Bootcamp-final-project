<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Game;
use App\Entity\DLC;
use App\Repository\GameRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class GameController extends AbstractController
{

    private function serialize($gamesData)
    {
        $gamesArray = [];

        foreach ($gamesData as $gameData) {
            $game = [
                "id" => $gameData->getId(),
                "name" => $gameData->getName(),
                "description" => $gameData->getDescription(),
                "poster" => $gameData->getPoster(),
                "images" => $gameData->getImages(),
                "clip" => $gameData->getClip(),
                "releaseDate" => $gameData->getReleaseDate(),
                "platforms" => $gameData->getPlatforms(),
                "pcMinimum" => $gameData->getPcMinimum(),
                "pcRecomended" => $gameData->getPcRecomended(),
                "genres" => $gameData->getGenres(),
                "developer" => $gameData->getDeveloper(),
                "metacritic" => $gameData->getMetacriticRating(),
                "dlcs" => []
            ];

            foreach ($gameData->getDlcs() as $dlcData) {
                $dlc = [
                    "name" => $dlcData->getName(),
                    "description" => $dlcData->getDescription(),
                    "poster" => $dlcData->getPoster(),
                    "releaseDate" => $dlcData->getReleaseDate(),
                ];

                $game["dlcs"][] = $dlc;
            }

            $gamesArray[] = $game;
        }

        return $gamesArray;
    }

    private function paginate($page, $maxPages, $data)
    {
        $prevPage = 1;
        $nextPage = 20;

        if ($page > 1) {
            $prevPage = $page - 1;
        };

        if ($page < $maxPages) {
            $nextPage = $page + 1;
        };

        $response = [
            "nextPage" => $nextPage,
            "prevPage" => $prevPage,
            "maxPages" => $maxPages,
            "results" => $this->serialize($data)
        ];

        return $response;
    }

    /**
     * @Route("/add", name="add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $em): Response
    {
        $gamesData = json_decode($request->getContent());

        print_r(($gamesData));
        foreach ($gamesData as $gameData) {
            $game = new Game;
            $game->setName($gameData->name);
            $game->setDescription($gameData->description);
            $game->setPoster($gameData->poster);
            $game->setImages($gameData->images);
            $game->setClip($gameData->clip);
            $game->setReleaseDate($gameData->releaseDate);
            $game->setPlatforms($gameData->platforms);
            $game->setPcMinimum($gameData->pcMinimum);
            $game->setPcRecomended($gameData->pcRecomended);
            $game->setGenres($gameData->genres);
            $game->setDeveloper($gameData->developers);
            $game->setMetacriticRating($gameData->metacritic);

            foreach ($gameData->dlcs as $dlcData) {
                $dlc = new DLC;
                $dlc->setName($dlcData->name);
                $dlc->setDescription($dlcData->description);
                $dlc->setPoster($dlcData->poster);
                $dlc->setReleaseDate($dlcData->releaseDate);

                $game->addDlc($dlc);

                $em->persist($dlc);
            }

            $em->persist($game);
            $em->flush();
        }

        return new JsonResponse(["ok"]);
    }

    /**
     * @Route("/games/{page}", name="games", methods={"GET"})
     */
    public function game($page, GameRepository $repo): Response
    {
        $skip = 20 * ($page - 1);

        $gamesData = $repo->findBy([], [], 20, $skip);

        return new JsonResponse($this->paginate($page,20,$gamesData));
    }

    /**
     * @Route("/best/{page}", name="best", methods={"GET"})
     */
    public function best($page, GameRepository $repo): Response
    {
        $skip = 20 * ($page - 1);

        $gamesData = $repo->findBy([], ["metacriticRating" => "DESC"], 20, $skip);

        return new JsonResponse($this->paginate($page,20,$gamesData));
    }

    /**
     * @Route("/search/{query}", name="search", methods={"GET"})
     */
    public function search($query, GameRepository $repo): Response
    {
        $gamesData = $repo->search($query);

        return new JsonResponse($this->serialize($gamesData));
    }

    /**
     * @Route("/platform/{platform}/{page}", name="platform", methods={"GET"})
     */
    public function filterPlatform($page, $platform, GameRepository $repo): Response
    {
        $skip = 20 * ($page - 1);

        $maxPages=$repo->ceil(sizeof($repo->filterPlatform($platform, 0,400))/20);

        $gamesData = $repo->filterPlatform($platform, $skip,20);

        return new JsonResponse($this->paginate($page,$maxPages,$gamesData));
    }

    /**
     * @Route("/genre/{genre}/{page}", name="genre", methods={"GET"})
     */
    public function filterGenre($page, $genre, GameRepository $repo): Response
    {
        $skip = 20 * ($page - 1);

        $maxPages=ceil(count($repo->filterPlatform($genre,0,400))/20);

        

        $gamesData = $repo->filterGenre($genre, $skip,20);

        return new Response(print_r($repo->filterGenre($genre, $skip,20)));

        /* return new JsonResponse($this->paginate($page,$maxPages,$gamesData)); */
    }
}
