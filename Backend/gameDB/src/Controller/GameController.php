<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    /**
     * @Route("/add", name="add")
     */
    public function index(): Response
    {
        $data = json_decode(file_get_contents('php://input'), true);
        print_r($data);
        return $this->render('game/index.html.twig', [
            'controller_name' => 'GameController',
        ]);
    }
}
