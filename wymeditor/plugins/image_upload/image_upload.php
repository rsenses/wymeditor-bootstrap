<?php

// Move the uploaded file

// Create a resized version in the cache

// $return = array(
// 	'filename'	=> $originalFileName,	// The original filename, this will be put in as the "alt" text
// 	'url'		=> $downloadUrl,		// The URL to the original file to be downloaded. This is not used by image_upload, but by site_links
// );

// You need to add server side validation and better error handling here

$data = array();

$error = false;
$files = array();

$base_dir = __DIR__; // Absolute path to your installation, ex: /var/www/mywebsite
$doc_root = preg_replace("!{$_SERVER['SCRIPT_NAME']}$!", '', $_SERVER['SCRIPT_FILENAME']); # ex: /var/www
$base_url = preg_replace("!^{$doc_root}!", '', $base_dir); # ex: '' or '/mywebsite'
$uploadurl = $base_url . '/uploads/';
$uploaddir = __DIR__ . '/uploads/';
foreach($_FILES as $file) {
    if(move_uploaded_file($file['tmp_name'], $uploaddir . basename($file['name']))) {
        $data['filename'] = basename($file['name']);
        $data['url'] = $uploadurl . basename($file['name']);
    }
    else {
        $data['error'] = 'There was an error uploading your files';
    }
}

echo json_encode($data);
