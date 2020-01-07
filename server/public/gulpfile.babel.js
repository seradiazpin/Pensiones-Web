import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";


gulp.task("transpile", () => {

  return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .on("error", function(error){
      console.error( "\nError: ", error.message, "\n");
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));

});


gulp.task("default", gulp.series("transpile"));




gulp.task("watch", gulp.series("transpile", () => {
  gulp.watch("src/**/*", gulp.series("transpile"));
}));

