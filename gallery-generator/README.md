mg-ecoconstruction.com — Gallery generator
==========================

mg-ecoconstruction.com's gallery is built on top of Photoswipe, with a small amount of custom code.

This project provides two main commands:

``` sh
./bin/generate-thumbnails
```

generates thumbnails from larger size, original pictures stored in dist/images/gallery/.

```
./bin/generate-gallery
```

generates a full-flegded, Hugo-compliant gallery page that is automatically transfered to the appropriate location inside the website sub-project.

It's also through this project that one controls the gallery's content: images orders & captions (see src/html/gallery/images_list.yml).
