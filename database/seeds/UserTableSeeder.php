<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();

        DB::table('users')->insert([
        	[
        		'name' => 'Rai',
        		'email' => 'rai@rai.com',
        		'password' => bcrypt('123123')
        	],
        	[
        		'name' => 'Marisse',
        		'email' => 'marisse@sundaysim',
        		'password' => bcrypt('123123')
        	]
        	]);
    }
}
