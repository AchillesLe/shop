var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var child = require("child_process");
var fs = require("fs");
var nodemon = require("gulp-nodemon");

var VendorJsFiles = [
  //index
  "./assets/gentelella/vendors/jquery/dist/jquery.js",
  "./assets/gentelella/vendors/bootstrap/dist/js/bootstrap.min.js",
  "./assets/gentelella/vendors/fastclick/lib/fastclick.js",
  // "./assets/gentelella/vendors/nprogress/nprogress.js",

  "./assets/gentelella/vendors/Chart.js/dist/Chart.min.js",
  "./assets/gentelella/vendors/gauge.js/dist/gauge.min.js",
  "./assets/gentelella/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js",
  "./assets/gentelella/vendors/iCheck/icheck.min.js",
  "./assets/gentelella/vendors/skycons/skycons.js",
  "./assets/gentelella/vendors/Flot/jquery.flot.js",
  "./assets/gentelella/vendors/Flot/jquery.flot.pie.js",
  "./assets/gentelella/vendors/Flot/jquery.flot.time.js",
  "./assets/gentelella/vendors/Flot/jquery.flot.stack.js",
  "./assets/gentelella/vendors/Flot/jquery.flot.resize.js",
  "./assets/gentelella/vendors/flot.orderbars/js/jquery.flot.orderBars.js",
  "./assets/gentelella/vendors/flot-spline/js/jquery.flot.spline.min.js",
  "./assets/gentelella/vendors/flot.curvedlines/curvedLines.js",
  "./assets/gentelella/vendors/DateJS/build/date.js",
  "./assets/gentelella/vendors/jqvmap/dist/jquery.vmap.js",
  "./assets/gentelella/vendors/jqvmap/dist/maps/jquery.vmap.world.js",
  "./assets/gentelella/vendors/jqvmap/examples/js/jquery.vmap.sampledata.js",
  "./assets/gentelella/vendors/moment/min/moment.min.js",
  "./assets/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.js",

  //tables
  "./assets/gentelella/vendors/datatables.net/js/jquery.dataTables.min.js",
  "./assets/gentelella/vendors/datatables.net-bs/js/dataTables.bootstrap.min.js",
  "./assets/gentelella/vendors/datatables.net-buttons/js/dataTables.buttons.min.js",
  "./assets/gentelella/vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js",
  "./assets/gentelella/vendors/datatables.net-buttons/js/buttons.flash.min.js",
  "./assets/gentelella/vendors/datatables.net-buttons/js/buttons.html5.min.js",
  "./assets/gentelella/vendors/datatables.net-buttons/js/buttons.print.min.js",
  "./assets/gentelella/vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js",
  "./assets/gentelella/vendors/datatables.net-keytable/js/dataTables.keyTable.min.js",
  "./assets/gentelella/vendors/datatables.net-responsive/js/dataTables.responsive.min.js",
  "./assets/gentelella/vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js",
  "./assets/gentelella/vendors/datatables.net-scroller/js/dataTables.scroller.min.js",
  "./assets/gentelella/vendors/jszip/dist/jszip.min.js",
  "./assets/gentelella/vendors/pdfmake/build/pdfmake.min.js",
  "./assets/gentelella/vendors/pdfmake/build/vfs_fonts.js",

  //form
  "./assets/gentelella/vendors/bootstrap-wysiwyg/js/bootstrap-wysiwyg.min.js",
  "./assets/gentelella/vendors/jquery.hotkeys/jquery.hotkeys.js",
  "./assets/gentelella/vendors/google-code-prettify/src/prettify.js",
  "./assets/gentelella/vendors/jquery.tagsinput/src/jquery.tagsinput.js",
  "./assets/gentelella/vendors/switchery/dist/switchery.min.js",
  "./assets/gentelella/vendors/select2/dist/js/select2.full.min.js",
  "./assets/gentelella/vendors/parsleyjs/dist/parsley.min.js",
  "./assets/gentelella/vendors/autosize/dist/autosize.min.js",
  "./assets/gentelella/vendors/devbridge-autocomplete/dist/jquery.autocomplete.min.js",
  "./assets/gentelella/vendors/starrr/dist/starrr.js",

  //custom for library
  "./assets/gentelella/build/js/custom.min.js"
],
  VenderCssFiles = [
    "./assets/gentelella/vendors/bootstrap/dist/css/bootstrap.min.css",
    "./assets/gentelella/vendors/font-awesome/css/font-awesome.min.css",
    "./assets/gentelella/vendors/nprogress/nprogress.css",
    "./assets/gentelella/vendors/iCheck/skins/flat/green.css",
    "./assets/gentelella/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css",
    "./assets/gentelella/vendors/jqvmap/dist/jqvmap.min.css",
    "./assets/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.css",

    //tables
    "./assets/gentelella/vendors/datatables.net-bs/css/dataTables.bootstrap.min.css",
    "./assets/gentelella/vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css",
    "./assets/gentelella/vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css",
    "./assets/gentelella/vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css",
    "./assets/gentelella/vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css",

    //form
    "./assets/gentelella/vendors/google-code-prettify/bin/prettify.min.css",
    "./assets/gentelella/vendors/select2/dist/css/select2.min.css",
    "./assets/gentelella/vendors/switchery/dist/switchery.min.css",
    "./assets/gentelella/vendors/starrr/dist/starrr.css",
    "./assets/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.css",

    //custom for library
    "./assets/gentelella/build/css/custom.min.css"
  ],
  jsDest = "dist/scripts";

gulp.task("javascript:libs", function() {
  return (
    gulp
      .src(VendorJsFiles)
      .pipe(concat("libs.js"))
      .pipe(gulp.dest("./public/vendors/js"))
      .on("error", handleErrors)
  );
});

gulp.task("css:libs", function() {
  return (
    gulp
      .src(VenderCssFiles)
      .pipe(concat("libs.css"))
      .pipe(gulp.dest("./public/vendors/css"))
      .on("error", handleErrors)
  );
});

gulp.task("build:libs", gulp.parallel("javascript:libs", "css:libs"));

gulp.task('server', function() {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: 'start',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ["src/*.js",],
        ext: 'js'
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    }).on('restart', () => {
    gulp.src('./server.js')
      // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
      .pipe(notify('Restarting...'));
  });
});

gulp.task(
  "default",
  gulp.series("build:libs")
);


function handleErrors(error) {
  console.log(error);
  //TODO
}
