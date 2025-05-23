-- MASTER --
<!DOCTYPE html>
<html lang="en">
<head>
  <title>{{TITLE}}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8">
  <!-- target-densitydpi=device-dpi -->
  <meta name="viewport" content="{{METAVIEWPORT}}">
  {{GLOBAL_CSS_INCLUDES}}
  <link rel="stylesheet" type="text/css" href="">
  <script>
		TCHMI_ENABLE_DESIGNER_MODE = true;
		TCHMI_ENABLE_DESIGNER_MODE_MASTER = true;
		TCHMI_ENABLE_DESIGNER_MODE_FALLBACK_CONFIG_JSON = {
			"basePath": "{{BASEURL}}",
			"tcHmiServer": {
				"websocketOverwrite": {
					"host": "{{SERVER_HOST}}",
					"port": {{SERVER_PORT}}
				},
				"websocketIntervalTime": 200
			}
		};
  </script>
  {{GLOBAL_JS_INCLUDES}}
  <script>
  window.onload = function load() {
   if((!this['TcHmi'] || !this['TcHmi'].System) && document.body){
	document.body.innerHTML = 'TwinCAT HMI Framework could not be loaded. Perhaps a more modern web browser (which supports ES6 JavaScript) is needed.';
   }
  };
</script>
  <script></script>
</head>
<body>
	{{VIEWLEVEL}}
</body>
</html>
-- /MASTER --

-- SLAVE --
<!DOCTYPE html>
<!--
  Copyright (C) {{YEAR}} {{COMPANYNAME}}    
  For any information visit: {{COMPANYWEBSITE}}

  Deployment
  +++++++++++++++++++++++++++
	Version: {{VERSION}}
	Date: {{DATE}}, Time: {{TIME}}
-->
<html lang="en">
<head>
  <title>{{TITLE}}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8">
  <!-- target-densitydpi=device-dpi -->
  <meta name="robots" content="noindex, nofollow, noarchive, noimageindex">
  <meta name="google" content="notranslate">
  <meta name="viewport" content="{{METAVIEWPORT}}">
  {{GLOBAL_CSS_INCLUDES}}
  <link rel="shortcut icon" type="image/png" href="./FavIcon.png">
  {{GLOBAL_JS_INCLUDES}}
  <script>
  window.onload = function load() {
   if((!this['TcHmi'] || !this['TcHmi'].System) && document.body){
	document.body.innerHTML = 'TwinCAT HMI Framework could not be loaded. Perhaps a more modern web browser (which supports ES6 JavaScript) is needed.';
   }
  };
</script>
</head>
<body>
	<noscript style="font-size: large; padding: 50px;">
		TwinCAT HMI needs to execute JavaScript Code in the browser. 
		Please enable JavaScript in this browser to use the HMI.
	</noscript>
	{{VIEWLEVEL}}
</body>
</html>
-- /SLAVE --

-- STANDARD --
<!DOCTYPE html>
<!--
  Copyright (C) {{YEAR}} {{COMPANYNAME}}    
  For any information visit: {{COMPANYWEBSITE}}

  Deployment
  +++++++++++++++++++++++++++
	Version: {{VERSION}}
	Date: {{DATE}}, Time: {{TIME}}
-->
<html lang="en">
<head>
  <title>{{TITLE}}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8">
  <meta http-equiv="cache-control" content="no-cache">
  <!-- target-densitydpi=device-dpi -->
  <meta name="viewport" content="{{METAVIEWPORT}}">
  <meta name="robots" content="noindex, nofollow, noarchive, noimageindex">
  <meta name="google" content="notranslate">
  <link rel="manifest" href="Properties/tchmimanifest.json">
  {{GLOBAL_CSS_INCLUDES}}
  <script>
	TCHMI_CONSOLE_LOG_LEVEL = {{LOGLEVEL}};
	TCHMI_CONSOLE_LOG_TCHMISERVER_MESSAGES = {{TCHMI_CONSOLE_LOG_TCHMISERVER_MESSAGES}};
	TCHMI_CONSOLE_LOG_DESIGNER_MODE_COM_MESSAGES = {{TCHMI_CONSOLE_LOG_DESIGNER_MODE_COM_MESSAGES}};
  </script>
  {{GLOBAL_JS_INCLUDES}}
  <script>
  window.onload = function load() {
   if((!this['TcHmi'] || !this['TcHmi'].System) && document.body){
	document.body.innerHTML = 'TwinCAT HMI Framework could not be loaded. Perhaps a more modern web browser (which supports ES6 JavaScript) is needed.';
   }
  };
</script>
</head>
<body>
	<noscript style="font-size: large; padding: 50px;">
		TwinCAT HMI needs to execute JavaScript Code in the browser. 
		Please enable JavaScript in this browser to use the HMI.
	</noscript>
	{{VIEWLEVEL}}
</body>
</html>
-- /STANDARD --

