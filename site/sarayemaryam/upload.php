<?php
echo $_GET;
echo $_POST;
echo $_FILES;
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
    if ($_FILES["file"]["error"] > 0){
        echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    }else{
        echo "Upload: " . $_FILES["file"]["name"] . "<br>";
        echo "Type: " . $_FILES["file"]["type"] . "<br>";
        echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
        echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";

        if (file_exists("upload/" . $_FILES["file"]["name"])){
            echo $_FILES["file"]["name"] . " already exists. ";
        }else{
            if (copy($_FILES["file"]["tmp_name"],
		    "/var/www/site/sarayemaryam/upload" . $_FILES["file"]["name"])) {echo "true";
		    } 
	    else {
	    echo "false";
	    }
	    echo "<br/>";
            echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
        }
    }
?>
