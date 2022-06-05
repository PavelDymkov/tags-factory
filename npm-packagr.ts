import { npmPackagr } from "npm-packagr";
import {
    badge,
    git,
    npx,
    packageJSON,
    Pipeline,
    publish,
    test,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        git("commit", "tags-factory"),

        npx("tsc"),

        packageJSON((packageJson) => {
            delete packageJson.devDependencies;
            delete packageJson.scripts;

            packageJson.main = "main.js";
        }),

        test(),

        badge("tests", {
            label: "tests",
            message: "passing",
        }),

        version("patch", {
            commitHooks: false,
            gitTagVersion: false,
        }),

        badgeLicense(),

        git("commit", "tags-factory"),
        git("push"),

        publish({
            login: { account: "paveldymkov", email: "dymkov86@gmail.com" },
        }),
    ],
});

function badgeLicense(): Pipeline {
    const { license } = require("./package/package");

    return badge("license", {
        label: "license",
        message: String(license),
        messageColor: "green",
    });
}
