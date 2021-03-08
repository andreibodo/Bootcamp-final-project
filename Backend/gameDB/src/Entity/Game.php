<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GameRepository::class)
 */
class Game
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=500)
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=1000)
     */
    private $poster;

    /**
     * @ORM\Column(type="array")
     */
    private $images = [];

    /**
     * @ORM\Column(type="string", length=1000)
     */
    private $clip;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $releaseDate;

    /**
     * @ORM\Column(type="array")
     */
    private $platforms = [];

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $pcMinimum;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $pcRecomended;

    /**
     * @ORM\Column(type="array")
     */
    private $genres = [];

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $developer;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $metacriticRating;

    /**
     * @ORM\OneToMany(targetEntity=DLC::class, mappedBy="game", orphanRemoval=true)
     */
    private $dlcs;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="playlist")
     */
    private $users;

    public function __construct()
    {
        $this->dlcs = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPoster(): ?string
    {
        return $this->poster;
    }

    public function setPoster(string $poster): self
    {
        $this->poster = $poster;

        return $this;
    }

    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(array $images): self
    {
        $this->images = $images;

        return $this;
    }

    public function getClip(): ?string
    {
        return $this->clip;
    }

    public function setClip(string $clip): self
    {
        $this->clip = $clip;

        return $this;
    }

    public function getReleaseDate(): ?string
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(string $releaseDate): self
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    public function getPlatforms(): ?array
    {
        return $this->platforms;
    }

    public function setPlatforms(array $platforms): self
    {
        $this->platforms = $platforms;

        return $this;
    }

    public function getPcMinimum(): ?string
    {
        return $this->pcMinimum;
    }

    public function setPcMinimum(?string $pcMinimum): self
    {
        $this->pcMinimum = $pcMinimum;

        return $this;
    }

    public function getPcRecomended(): ?string
    {
        return $this->pcRecomended;
    }

    public function setPcRecomended(?string $pcRecomended): self
    {
        $this->pcRecomended = $pcRecomended;

        return $this;
    }

    public function getGenres(): ?array
    {
        return $this->genres;
    }

    public function setGenres(array $genres): self
    {
        $this->genres = $genres;

        return $this;
    }

    public function getDeveloper(): ?string
    {
        return $this->developer;
    }

    public function setDeveloper(string $developer): self
    {
        $this->developer = $developer;

        return $this;
    }

    public function getMetacriticRating(): ?int
    {
        return $this->metacriticRating;
    }

    public function setMetacriticRating(int $metacriticRating): self
    {
        $this->metacriticRating = $metacriticRating;

        return $this;
    }

    /**
     * @return Collection|DLC[]
     */
    public function getDlcs(): Collection
    {
        return $this->dlcs;
    }

    public function addDlc(DLC $dlc): self
    {
        if (!$this->dlcs->contains($dlc)) {
            $this->dlcs[] = $dlc;
            $dlc->setGame($this);
        }

        return $this;
    }

    public function removeDlc(DLC $dlc): self
    {
        if ($this->dlcs->removeElement($dlc)) {
            // set the owning side to null (unless already changed)
            if ($dlc->getGame() === $this) {
                $dlc->setGame(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addPlaylist($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removePlaylist($this);
        }

        return $this;
    }
}
