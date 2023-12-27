<?php

namespace App\Helpers\Form;

use App\Helpers\Form\Type\CheckboxType;
use App\Helpers\Form\Type\RadioType;
use App\Helpers\Form\Type\EmailType;
use App\Helpers\Form\Type\ImageType;
use App\Helpers\Form\Type\NumberType;
use App\Helpers\Form\Type\PasswordType;
use App\Helpers\Form\Type\SelectType;
use App\Helpers\Form\Type\TextType;
use App\Helpers\Form\Type\DateTimeType;
use App\Helpers\Form\Type\DateType;
use App\Helpers\Form\Type\SwitchType;
use App\Helpers\Form\Type\FileType;
use App\Helpers\Form\Type\TextareaType;

class FieldManager
{
    public function text()
    {
        return new TextType();
    }

    public function email()
    {
        return new EmailType();
    }

    public function password()
    {
        return new PasswordType();
    }

    public function number()
    {
        return new NumberType();
    }

    public function checkbox()
    {
        return new CheckboxType();
    }

    public function radio()
    {
        return new RadioType();
    }

    public function select()
    {
        return new SelectType();
    }

    public function image()
    {
        return new ImageType();
    }

    public function datetime()
    {
        return new DateTimeType();
    }

    public function date()
    {
        return new DateType();
    }

    public function switch()
    {
        return new SwitchType();
    }

    public function file()
    {
        return new FileType();
    }

    public function textarea()
    {
        return new TextareaType();
    }
}