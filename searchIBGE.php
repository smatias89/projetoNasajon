<?php

require_once "admin/WriteLog.php";

if(!isset($_SESSION))
{
    session_start();


}
?>
<html lang="pt">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Nasajon</title>
	

	<!-- Google Font: Source Sans Pro -->
	<link rel="stylesheet" href="plugins/googleapi-fonts/css/font-sans-pro-fallback.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">	
	<!-- Ionicons -->
	<link rel="stylesheet" href="plugins/ion-icons/css/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="dist/css/adminlte.css">
	<!-- overlayScrollbars -->
	<link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
	<!-- Toastr -->
	<link rel="stylesheet" href="plugins/toastr/toastr.min.css">
	<!-- daterange picker -->
	<link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css">
	<!-- BIPESCOLA -->
  	<link rel="stylesheet" href="nasajon/css/bipescola.css">
	<style>
		.CodeMirror {border: 1px solid #ced4da; font-size: 1rem}		
	</style>
</head>

<body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed text-xs">
	<div class="wrapper">

		<!-- Preloader -->
      	<div class="preloader flex-column justify-content-center align-items-center">
        	<img class="animation__shake" src="nasajon/img/nasajon.png" alt="AdminLTELogo" height="60" width="60">
      	</div>
    
      	<!-- <?php
            include 'header.php';
        ?> -->

		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<div class="content-header">
				<div class="container-fluid">
					<div class="row mb-2">
						<div class="col-sm-6">
							<h1 class="m-0 title-user-form">Nasajon API</h1>
						</div>
						<div class="col-sm-6">
							<ol class="breadcrumb float-sm-right">
								<li class="breadcrumb-item"><a href="#">Home</a></li>
								<li class="breadcrumb-item active">Nasajon </li>
							</ol>
						</div>
					</div>
				</div>
			</div>
			<!-- /.content-header -->

			<!-- Main content -->
			<section class="content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">
							<!-- Horizontal Form -->
							<div class="card card-info">
								<div class="card-header">
									<h3 class="card-title">Carregar arquivo</h3>
								</div>
								<!-- /.card-header -->
								<!-- form start -->
								<form action="ajax/serachIBGEGetByFilter.php" method="post" enctype="multipart/form-data">
									<div class="card-body">
										<div class="form-group row" id="">
											<label class="col-sm-2 col-form-label">Selecione o CSV:</label>
											<div class="col-sm-3">
												<input class="form-control" type="file" name="csvFile" accept=".csv">
											</div>
											<button class="btn btn-success save-button" type="submit">Enviar</button>
										</div>
									
								</form>
							</div>
							<!-- /.card -->
						</div>
						<!-- /.card -->
					</div>
				</div><!-- /.container-fluid -->
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
		<footer class="main-footer">
			<strong>Copyright &copy; 2026 - Nasajon</strong>
			Todos os direitos reservados.
			<div class="float-right d-none d-sm-inline-block">
			<b>Version</b> 1.0.0
			</div>
		</footer>
		
		<!-- Control Sidebar -->
		<aside class="control-sidebar control-sidebar-dark">
			<!-- Control sidebar content goes here -->
		</aside>
		<!-- /.control-sidebar -->
	</div>
	<!-- ./wrapper -->


<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js" nonce="bipescola-scripts"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js" nonce="bipescola-scripts"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.js" nonce="bipescola-scripts"></script>
<!-- Toastr -->
<script src="plugins/toastr/toastr.min.js" nonce="bipescola-scripts"></script>

		

</body>

</html>