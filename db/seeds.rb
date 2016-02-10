# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Property.create(
	:images         => [
                          Image.new(url: "https://facebook.github.io/react/img/logo_og.png", alt_text: "React"),
                          Image.new(url: "https://pbs.twimg.com/profile_images/2149314222/square.png", alt_text: "Angular")
                       ],
    :neighborhood   => "Pocitos",
    :address        => "Juan Benito Blanco 1035 apartamento 001, esquina Marti.",
    :description    => "Very nice apartment.",
    :price_currency => "UYU",

    :contact_telephone => "099977882",
    :contact_from_time => "09:00",
    :contact_to_time   => "18:00",
    :contact_email     => "mrifonelizalde@gmail.com",
    :contact_from_day  => 0,
    :contact_to_day    => 4,

    :id                             => 5,
    :lat                            => -34.912658,
    :lon                            => -56.148178,
    :price                          => 15000,
    :shared_expenses                => 2000,
    :price_includes_shared_expenses => true,
    :bedroom_amount                 => 3,
    :bathroom_amount                => 3,
    :m2_built                       => 50,
    :m2_not_built                   => 10,
    :has_garage                     => true,
    :floor                          => 1,
    :floor_amount                   => 1)

Property.create(
    :images         => [],

    :neighborhood   => "Centro",
    :address        => "Rio Negro 1187 apartamento 202, esquina Canelones.",
    :description    => "Very nice apartment.",
    :price_currency => "UYU",

    :contact_telephone => "097981601",
    :contact_from_time => "08:00",
    :contact_to_time   => "22:00",
    :contact_email     => "ivane2004@gmail.com",
    :contact_from_day  => 0,
    :contact_to_day    => 6,

    :id                             => 58,
    :lat                            => -34.909176,
    :lon                            => -56.193398,
    :price                          => 10000,
    :shared_expenses                => 0,
    :price_includes_shared_expenses => false,
    :bedroom_amount                 => 1,
    :bathroom_amount                => 1,
    :m2_built                       => 40,
    :m2_not_built                   => 0,
    :has_garage                     => false,
    :floor                          => 2,
    :floor_amount                   => 1)
