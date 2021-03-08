<?php

namespace App\Repository;

use App\Entity\DLC;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DLC|null find($id, $lockMode = null, $lockVersion = null)
 * @method DLC|null findOneBy(array $criteria, array $orderBy = null)
 * @method DLC[]    findAll()
 * @method DLC[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DLCRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DLC::class);
    }

    // /**
    //  * @return DLC[] Returns an array of DLC objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DLC
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
