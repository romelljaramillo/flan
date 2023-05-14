<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Laravel\Jetstream\Features;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'name' => $this->faker->firstname(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'profile_photo_path' => $this->generateImage(storage_path('app/images/users'),400,400, uniqid()),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }

    /**
     * Indicate that the user should have a personal team.
     *
     * @return $this
     */
    public function withPersonalTeam()
    {
        if (! Features::hasTeamFeatures()) {
            return $this->state([]);
        }

        return $this->has(
            Team::factory()
                ->state(function (array $attributes, User $user) {
                    return ['name' => $user->name.'\'s Team', 'user_id' => $user->id, 'personal_team' => true];
                }),
            'ownedTeams'
        );
    }

    /**
     * Generador de faker imagen local
     *
     * @param string $dir
     * @param integer $width
     * @param integer $height
     * @param string $text
     * @return string
     */
    public function generateImage($path = null, $width = 640, $height = 480, $text = '')
    {

        if ( !file_exists($path) ) {
            mkdir($path, 0777, true);
        }

        header("Content-type: image/png");

        $im = imagecreate($width, $height);

        $color_bg = imagecolorallocate($im, rand(0, 255), rand(0, 255), rand(0, 255));

        $txt_color = imagecolorallocate($im, rand(0, 255), rand(0, 255), rand(0, 255));

        $text_image = $width . " X " . $height;

        $fontsize = ($width > $height) ? ($height / 10) : ($width / 10);

        imagettftext(
            $im,$fontsize,
            0,
            round(($width/2) - ($fontsize * 2.75)),
            round(($height/2) + ($fontsize* 0.2)),
            $txt_color,
            resource_path('fonts/Roboto-Regular.ttf'),
            $text_image
        );

        $nameimage = str_replace(" ", "_", $text) . '.png';

        imagepng($im, $path . '/' . $nameimage);

        ImageDestroy($im);

        return $nameimage;
    }
}
