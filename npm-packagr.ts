import { npmPackagr } from "npm-packagr";
import {
    badge,
    BadgeType,
    git,
    npx,
    packageJSON,
    publish,
    test,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        git("commit", "tags-factory"),

        npx("tsc"),

        test(),

        badge(BadgeType.Test),

        version("patch", {
            commitHooks: false,
            gitTagVersion: false,
        }),

        packageJSON((packageJson) => {
            delete packageJson.devDependencies;
            delete packageJson.scripts;

            packageJson.main = "main.js";
        }),

        badge(BadgeType.License),

        git("commit", "tags-factory"),
        git("push"),

        publish({
            login: { account: "paveldymkov", email: "dymkov86@gmail.com" },
        }),
    ],
});
