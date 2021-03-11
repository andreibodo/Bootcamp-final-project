<?php

namespace App\Repository;

use App\Entity\Game;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Game|null find($id, $lockMode = null, $lockVersion = null)
 * @method Game|null findOneBy(array $criteria, array $orderBy = null)
 * @method Game[]    findAll()
 * @method Game[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    /**
     * @return Game[] Returns an array of Game objects
     */
    public function search($query)
    {
        return $this->createQueryBuilder('search')
            ->andWhere('search.name LIKE :query')
            ->setParameter('query', "%".$query."%")
            ->setMaxResults(20)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @return Game[] Returns an array of Game objects
     */
    public function filterPlatform($platform,$offset,$limit)
    {
        return $this->createQueryBuilder('filter')
            ->andWhere('filter.platforms LIKE :platform')
            ->setParameter('platform', "%".$platform."%")
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

     /**
     * @return Game[] Returns an array of Game objects
     */
    public function filterGenre($genre,$offset,$limit)
    {
        return $this->createQueryBuilder('filter')
            ->andWhere('filter.genres LIKE :genre')
            ->setParameter('genre', "%".$genre."%")
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    // /**
    //  * @return Game[] Returns an array of Game objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Game
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
