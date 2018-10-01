var text = "text": [
    {
      "id": 32,
      "name": "T1",
      "type": "Text",
      "opacity": 100,
      "fill": 100,
      "x": 404,
      "y": 119,
      "width": 214,
      "height": 28,
      "visible": true,
      "styles": {
        "blendOptions": {}
      },
      "color": "#ffffff",
      "image": null,
      "contents": "3333",
      "font": "Mada-Bold",
      "fontFamily": "Lato",
      "fontSize": "37.5",
      "justification": "CENTER",
      "capitalization": "NORMAL",
      "baselineShift": 0,
      "kerning": 0,
      "warpStyle": "NONE",
      "warpDirection": "HORIZONTAL",
      "warpHorizontalDistortion": 0,
      "warpVerticalDistortion": 0,
      "warpBend": 0,
      "position": {
        "x": 512.042069792878,
        "y": 146.338359603046
      },
      "layers": [],
      "smartFilters": null,
      "allowColorpicker": true,
      "allowMultiline": false,
      "maxCharactersPerLine": 33,
      "maxLines": 3,
      "excludable": true,
      "maxCharacters": 30,
      "allowedFonts": [
        {
          "name": "ArchivoBlack-Regular",
          "image": "/fonts/9b66d0f5a65c1b5ef3874d6503c8ca90.png",
          "visible": false,
          "displayName": "Archivo Black Regular",
          "file": "/fonts/9b66d0f5a65c1b5ef3874d6503c8ca90.ttf"
        },
        {
          "name": "Mada-Bold",
          "image": "/fonts/ffb4341bccf06ed03aa97c5444a9563e.png",
          "visible": true,
          "displayName": "Mada Bold",
          "file": "/fonts/ffb4341bccf06ed03aa97c5444a9563e.ttf"
        }
      ],
      "tag": "TEXT1"
    }
  ];

function _loadFont(textRecord) {
    var engine, fontURL, style, fontName;

    engine = this;

    if (!textRecord) {
        // Font isn't in the ui.json, don't care about it
        return Promise.resolve();
    }

    var fontInfo = (textRecord.allowedFonts || []).filter(function (font) {
        return font.name === textRecord.font;
    })[0];

    if (!fontInfo || !fontInfo.file) {
        console.log('Font info for ' + textRecord.font + ' does not exist');
        return Promise.resolve(textRecord.font);
    }

    fontURL = engine._cdnBasePath() + fontInfo.file;

    return engine._fontToBase64(fontURL).then(function(base64font) {
        if (!engine._fontTags[fontInfo.name]) {
            style    = document.createElement('style');
            fontName = ('a' + performance.now()).replace('.', '');
            style.innerHTML = '@font-face {font-family: \'' + fontName + '\'; src: url(' + base64font + ')}';

            engine._fontTags[fontInfo.name] = {
                style : style,
                name  : fontName
            };
        }
    });
}

function _fontToBase64 (fontUrl) {
    var xhr = new XMLHttpRequest();

    return new Promise (function(resolve, reject){
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result);
            };

            reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", fontUrl);
        xhr.responseType = "blob";
        xhr.send();
    });
}