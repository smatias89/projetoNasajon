<?php

require_once "admin/WriteLog.php";

if(!isset($_SESSION)){

  session_start();
    

}
?>
<!DOCTYPE html>
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
  <!-- DataTables -->  
  <link rel="stylesheet" href="plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
  <link rel="stylesheet" href="plugins/datatables-buttons/css/buttons.bootstrap4.min.css">  
  <link rel="stylesheet" href="plugins/datatables-select/css/select.bootstrap4.min.css">  
  <link rel="stylesheet" href="plugins/datatables-contextual-actions/css/dataTables.contextualActions.css">
  <link rel="stylesheet" href="plugins/datatables-contextual-actions/js/dataTables.contextualActions.js">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- JQVMap -->
  <link rel="stylesheet" href="plugins/jqvmap/jqvmap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/adminlte.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css">
  <!-- summernote -->
  <link rel="stylesheet" href="plugins/summernote/summernote-bs4.min.css">
  <!-- pace-progress -->
  <link rel="stylesheet" href="plugins/pace-progress/themes/black/pace-theme-flat-top.css">
  <!-- SweetAlert2 -->
  <link rel="stylesheet" href="plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">
  <!-- Toastr -->
  <link rel="stylesheet" href="plugins/toastr/toastr.min.css"> 
  <!-- daterange picker -->
  <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css">    
  <!-- Nasajon -->
  <link rel="stylesheet" href="handScale/css/bipescola.css">  
</head>
<body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed text-xs">
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="handScale/img/logo_icononly_transparent_nobuffer.png" alt="AdminLTELogo" height="60" width="60">
  </div>

  <?php
      include 'header.php';
  ?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <!-- <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">User</h1>
          </div><-- /.col --
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/index">Home</a></li>
              <li class="breadcrumb-item active">User </li>
            </ol>
          </div><-- /.col --
        </div><-- /.row --
      </div><-- /.container-fluid -->
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
					<h3 class="card-title">Buscar - Funções</h3>
				  </div>
				  <!-- /.card-header -->
				  <!-- form start -->
				  <form class="form-horizontal">
					<div class="card-body">
					  <div class="form-group row">
						<label for="listMusicID" class="col-sm-1 col-form-label">Função ID</label>
              <div class="col-sm-2">
                <input type="text" class="form-control" id="listMusicID" placeholder=" ID" spellcheck="false" autocomplete="off" autocorrect="off">
              </div>
            <label for="listMusicFullName" class="offset-sm-1 col-sm-1 col-form-label">Nome</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="listMusicFullName" placeholder="Nome" spellcheck="false" autocomplete="off" autocorrect="off">
              </div>
						<label for="listMusicFgAtv" class="offset-sm-1 col-sm-1 col-form-label">Ativo</label>
              <div class="col-sm-1">
                <select class="form-control" id="listMusicFgAtv">
                  <option value="">--</option>
                  <option value="Y">S</option>
                  <option value="N">N</option>													
                </select>
              </div>						
					  </div>

					  <!-- <div class="form-group row"> edit  </div> -->

					</div>
					<!-- /.card-body -->
					<div class="card-footer">					  
					  <button type="button" class="btn btn-default back-button" id="listMusicBackButton">Voltar</button>
					  <div class="float-right">
							<!-- /*<% if (lstProfilePermission.stream().filter(c -> c.getPermissionShdesc().equals("SAVE_LOGIN")).findAny().orElse(null) != null) { %>*/-->
							<button type="button" class="btn btn-info new-button" id="listMusicNew"><i class="fa fa-plus"></i> Nova</button>&nbsp;&nbsp;
							<!-- /*<% } %>*/ -->
							<button type="button" class="btn btn-info search-button" id="listMusicSearch"><i class="fa fa-search"></i> Buscar</button>
					  </div>
					</div>
					<!-- /.card-footer -->
				  </form>
				</div>
				<!-- /.card -->
			</div>	
			<div class="col-12">
				
				<div class="card">
				  <!--<div class="card-header">
					<h3 class="card-title">DataTable with minimal features & hover style</h3>
				  </div>-->
				  <!-- /.card-header -->
				  <div class="card-body">
            <table id="listMusicTable" class="table table-bordered table-hover">
              <thead>
              <tr>
                <th></th>
                <th>Function ID</th>
                <th>Nome</th>
                <th>Cantor</th>
                <th>Ativo</th>				  	  
              </tr>
              </thead>
              <tbody>                  
              </tbody>                  
            </table>
				  </div>
				  <!-- /.card-body -->
				</div>
			</div>	
            <!-- /.card -->			
		</div>
      </div><!-- /.container-fluid -->	  
    </section>	
    <!-- /.content -->
  </div>  
  <!-- /.content-wrapper -->
  
  <?php
    include 'footer.php';
  ?>

  <?php
    include 'handScaleModal.php';
  ?>
  
  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->
<input type="hidden" id="hidListMusicID" value="<?php echo (isset($_POST["listMusicID"]) && $_POST["listMusicID"] != null && $_POST["listMusicID"] != ""? $_POST["listMusicID"] : "") ?>">
<input type="hidden" id="hidActionType" value="">

<input type="hidden" id="hidDelete" value="<?php echo (isset($_POST["action"]) && $_POST["action"] != null && $_POST["action"] != ""?$_POST["action"]:"")?>">

<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js" nonce="bipescola-scripts"></script>
<!-- jQuery UI 1.11.4 -->
<script src="plugins/jquery-ui/jquery-ui.min.js" nonce="bipescola-scripts"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script src="handScale/js/jquery-bootstrap-fix-tooltip.js" nonce="bipescola-scripts"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js" nonce="bipescola-scripts"></script>
<!-- ChartJS -->
<script src="plugins/chart.js/Chart.min.js" nonce="bipescola-scripts"></script>
<!-- Sparkline -->
<script src="plugins/sparklines/sparkline.js" nonce="bipescola-scripts"></script>
<!-- JQVMap -->
<script src="plugins/jqvmap/jquery.vmap.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/jqvmap/maps/jquery.vmap.usa.js" nonce="bipescola-scripts"></script>
<!-- jQuery Knob Chart -->
<script src="plugins/jquery-knob/jquery.knob.min.js" nonce="bipescola-scripts"></script>
<!-- daterangepicker -->
<script src="plugins/moment/moment.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/daterangepicker/daterangepicker.js" nonce="bipescola-scripts"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js" nonce="bipescola-scripts"></script>
<!-- Summernote -->
<script src="plugins/summernote/summernote-bs4.min.js" nonce="bipescola-scripts"></script>
<!-- overlayScrollbars -->
<script src="plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js" nonce="bipescola-scripts"></script>
<!-- pace-progress -->
<script src="plugins/pace-progress/pace.min.js" nonce="bipescola-scripts"></script>
<!-- DataTables  & Plugins -->
<script src="plugins/datatables/jquery.dataTables.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-bs4/js/dataTables.bootstrap4.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-responsive/js/dataTables.responsive.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-responsive/js/responsive.bootstrap4.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-buttons/js/dataTables.buttons.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-buttons/js/buttons.bootstrap4.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/jszip/jszip.min.js" nonce="bipescola-scripts"></script>
<!--<script src="plugins/pdfmake/pdfmake.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/pdfmake/vfs_fonts.js" nonce="bipescola-scripts"></script>-->
<script src="plugins/datatables-buttons/js/buttons.html5.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-buttons/js/buttons.print.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-buttons/js/buttons.colVis.min.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-select/js/dataTables.select.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-select/js/select.bootstrap4.js" nonce="bipescola-scripts"></script>
<script src="plugins/datatables-contextual-actions/js/dataTables.contextualActions.js" nonce="bipescola-scripts"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.js" nonce="bipescola-scripts"></script>
<!-- AdminLTE for demo purposes -->
<!--<script src="dist/js/demo.js" nonce="bipescola-scripts"></script>-->
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!--<script src="dist/js/pages/dashboard.js" nonce="bipescola-scripts"></script>-->
<!-- Popper -->
<script src="plugins/popper/umd/popper.js" nonce="bipescola-scripts"></script>
<!-- LetterPic -->
<script src="handScale/js/jquery.letterpic.js" nonce="bipescola-scripts"></script>
<!-- SweetAlert2 -->
<script src="plugins/sweetalert2/sweetalert2.min.js" nonce="bipescola-scripts"></script>
<!-- Toastr -->
<script src="plugins/toastr/toastr.min.js" nonce="bipescola-scripts"></script>
<!-- date-range-picker -->
<script src="plugins/daterangepicker/daterangepicker.js" nonce="bipescola-scripts"></script>
<!-- handScale 0605-->
<script src="handScale/js/handScale.js<?php echo "?t=" . rand(); ?>" nonce="bipescola-scripts"></script>
<script src="handScale/js/listMusicDAO.js<?php echo "?t=" . rand(); ?>" nonce="bipescola-scripts"></script>
<script src="handScale/js/listMusic.js<?php echo "?t=" . rand(); ?>" nonce="bipescola-scripts"></script>
 
<script nonce="bipescola-scripts">
	var divSearchActionOptionsParm = "";

	divSearchActionOptionsParm = 
				 
				    // ' <a class="dropdown-item" href="#" id="showModificationHistoryDiscipline"><i class="fas fa-list-alt mr-1"></i> Show Modification History </a>' +

				    /*<% if (lstProfilePermission.stream().filter(c -> c.getPermissionShdesc().equals("DELETE_LOGIN")).findAny().orElse(null) != null) { %>*/
				    ' <a class="dropdown-item" href="#" id="deleteListMusic"><i class="fas fa-trash-alt mr-1"></i> Deletar </a>'
				    /*<% } else out.println("''"); %>*/ +

				    /*<% if (lstProfilePermission.stream().filter(c -> c.getPermissionShdesc().equals("SAVE_LOGIN")).findAny().orElse(null) != null) { %>*/
				    ' <a class="dropdown-item" href="#" id="copyListMusic"><i class="fas fa-copy mr-1"></i> Copiar </a>'
				    /*<% } else out.println("''"); %>*/ +

				    ' <a class="dropdown-item" href="#" id="propertiesListMusic"><i class="fas fa-tools mr-1"></i> Propriedades </a>';
	
</script>

</body>
</html>