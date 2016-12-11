/**
 * Created by piera on 11/12/16.
 */
var gulp = require("gulp");
var phantom = require("gulp-phantom");

gulp.task('build', function(){
    gulp.src("./test.js")
        .pipe(phantom({
            ext: '.json'
        }))
    //    .pipe(gulp.dest("./data/"));
});
