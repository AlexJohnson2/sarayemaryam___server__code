<?php

$dbh = null;

try{

	                $dbh = new PDO("sqlite:../../db.sqlite3");

} catch(PDOExeption $e) {
	                echo $e->getMessage();
}

if ( $dbh === null ) exit;

$getDataQuery = "SELECT * FROM maryam_tarikhche_kharid";

$this_list = $dbh->query( $getDataQuery );


//echo strval($this_list);
//
$this_lis = [];
echo '<style>
	table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>';
echo '<table>';
foreach ( $this_list as $row) {
	echo '<tr>';
	echo '<br>';
	echo '<td>' . $row['id'] . '</td>';
	echo '<td>' . $row['name'] . '</td>';
	echo '<td>' . $row['username'] . '</td>';
	if ($row['status']=='NOK') {
		echo '<td>' . 'ناموفق' . '</td>';
	}
	echo '<img src="../media/' . $row['img'] . '">';
	echo '</tr>';
}
echo '</table>';
