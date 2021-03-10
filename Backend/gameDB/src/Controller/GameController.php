<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Game;
use App\Entity\DLC;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class GameController extends AbstractController
{
    /**
     * @Route("/add", name="add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $em): Response
    {
        $gamesData = json_decode($request->getContent());
        /* $data = json_decode(file_get_contents('php://input'), true); */

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
}
