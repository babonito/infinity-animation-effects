import gulp from "gulp";
import {path} from "./gulp/config/path.js";
import {plugins} from "./gulp/config/plugins.js";

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

import {server} from "./gulp/tasks/server.js";
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {scss} from "./gulp/tasks/scss.js";
import {otfToTtf, ttfToWoff, fontStyle} from "./gulp/tasks/fonts.js";
import {js} from "./gulp/tasks/js.js";
import {img} from "./gulp/tasks/img.js";
import {svgsprite} from "./gulp/tasks/svgsprite.js";
import {zip} from "./gulp/tasks/zip.js";

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, img);
}

export {svgsprite}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, img));

const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);

export {dev}
export {build}
export {deployZIP}

gulp.task('default', dev);