<?php

namespace App\Controller;

use App\Entity\User;
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
    public function register(Request $request, EntityManagerInterface $em,UserPasswordEncoderInterface $encoder): Response
    {

        $userData = json_decode($request->getContent());

        $user=new User;
        $user->setUsername($userData->username);
        $user->setEmail($userData->email);
        $password=$encoder->encodePassword($user, $userData->password);
        $user->setPassword($password);

        $em->persist($user);
        $em->flush();



       return new JsonResponse($user);
    }
}
