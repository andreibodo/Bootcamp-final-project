<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\GameRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request, EntityManagerInterface $em, UserPasswordEncoderInterface $encoder): Response
    {

        $userData = json_decode($request->getContent());

        $user = new User;
        $user->setUsername($userData->username);
        $user->setEmail($userData->email);
        $password = $encoder->encodePassword($user, $userData->password);
        $user->setPassword($password);

        $em->persist($user);
        $em->flush();



        return new JsonResponse($user);
    }

    /**
     * @Route("/playlist/{username}", name="playlist", methods={"GET"})
     */
    public function playlist(UserRepository $repo, $username): Response
    {
        $userDataRaw = $repo->findByUsername($username);

        $playlist = ["playlist" => []];

        foreach ($userDataRaw as $userData) {
            foreach ($userData->getPlaylist() as $playlistElement) {

                $game = [
                    "id" => $playlistElement->getId(),
                    "name" => $playlistElement->getName(),
                    "description" => $playlistElement->getDescription(),
                    "poster" => $playlistElement->getPoster(),
                    "images" => $playlistElement->getImages(),
                    "clip" => $playlistElement->getClip(),
                    "releaseDate" => $playlistElement->getReleaseDate(),
                    "platforms" => $playlistElement->getPlatforms(),
                    "pcMinimum" => $playlistElement->getPcMinimum(),
                    "pcRecomended" => $playlistElement->getPcRecomended(),
                    "genres" => $playlistElement->getGenres(),
                    "developer" => $playlistElement->getDeveloper(),
                    "metacritic" => $playlistElement->getMetacriticRating(),
                    "dlcs" => []
                ];

                foreach ($playlistElement->getDlcs() as $dlcData) {
                    $dlc = [
                        "name" => $dlcData->getName(),
                        "description" => $dlcData->getDescription(),
                        "poster" => $dlcData->getPoster(),
                        "releaseDate" => $dlcData->getReleaseDate(),
                    ];

                    $game["dlcs"][] = $dlc;
                }

                $playlist["playlist"][]=$game;
            }
        }


        return new JsonResponse($playlist);
    }

    /**
     * @Route("/playlist/add/{username}/{gameId}", name="add", methods={"GET"})
     */
    public function addToPlaylist(EntityManagerInterface $em,UserRepository $repo,GameRepository $gameRepo, $username,$gameId): Response
    {
        $userRaw = $repo->findByUsername($username);
        $gameRaw= $gameRepo->findById($gameId);

        foreach($userRaw as $user){
            foreach($gameRaw as $game){
                $user->addPlaylist($game);

                $em->persist($user);
                $em->flush();
            }
        }
        
        return new JsonResponse(["ok"]);
    }
}
