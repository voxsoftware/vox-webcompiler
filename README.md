
# vox-webcompiler


**NOTA** : Este módulo está en etapa de prueba y está sujeto a cambios antes de su versión release. Por favor no use este módulo aún


** **

Vox-webcompiler utiliza webpack para empaquetar sus módulos nodejs para usar en web.
Cuando se utiliza vox-webcompiler para compilar a web, se hace referencia a los siguientes módulos preempaquetados siempre que sea necesario

Este módulo está diseñado para ejecutarse sobre vox (*una aplicación hecha para crear y ejecutar aplicaciones multiplataforma*)

Vox-webcompiler incluye los siguientes loaders:

* file-loader
* css-loader
* less-loader
* style-loader

E incluye el plugin

* extract-text-webpack-plugin


## Documentación

* [Lista de cambios](/CHANGES.md)


## Instalación

Para instalar en Windows abra una ventana del cmd como administrador:
```sh
> $ vox -install -g vox-webcompiler
```

En sistemas Unix deberá usar sudo
```sh
> $ sudo vox -install -g vox-webcompiler
```


## Como usar

Cree un archivo con la misma estructura que [webpack.config.js](https://webpack.github.io/docs/configuration.html) pero llamelo en cambio vox.webcompiler.config.js


> webpack.config.js > vox.webcompiler.config.js


vox-webcompiler automáticamente reemplazará los módulos base para hacer referencia a los archivos core-basic o core-http respectivamente como se muestra a continuación

VoxWebcompiler incluye webpack, puede omitir añadir webpack como dependencia a su proyecto, y en vez de usar: 

```javascript
require("webpack")
```

puede usar

```javascript
core.VW.Web.Webpack
```


#### Desde código

```javascript
var compilation= new  core.VW.Web.Compiler.Compiler(path /*dirname o configfile*/)}

var resultado= await compilation.compile()
console.log(resultado.toString({
	colors:true
}))
```

#### Desde consola

Utilice -help para ver la ayuda 
```sh
> $ vwc -help
```

Para compilar un directorio que contiene el proyecto
```sh
> $ vwc -compile path
```



## core-basic

core-basic empaqueta los siguientes módulos. Cada vez que se haga referencia a estos módulos en su código, al empaquetar se hará referencia a core-basic.
Pero no se preocupe por el rendimiento, los módulos son cargados solo la primera vez que usted los use en su código


* buffer
* path
* events
* querystring
* url
* crypto
* vm

y variables globales

* Buffer

Esto quiere decir que en su página web, si utiliza alguno de los módulos mencionados anteriormente debe añadir el script core-basic

Compile de esta manera:

```sh
> $ vwc -core-basic --out-dir outpath
```

o la versión mínima
```sh
> $ vwc -core-basic --out-dir outpath -min
```


Luego desde HTML
```html
<script type='text/javascript' src='core-basic.js'></script>
```

o la versión mínima

```html
<script type='text/javascript' src='core-basic.min.js'></script>
```



## core-http
core.http tendrá los siguientes módulos.  Cada vez que se haga referencia a estos módulos en su código, al empaquetar se hará referencia a core-http.

* http
* https

Esto quiere decir que en su página web, si utiliza alguno de los módulos mencionados anteriormente debe añadir el script core-http

Compile de esta manera:

```sh
> $ vwc -core-basic --out-dir outpath
```

o la versión mínima
```sh
> $ vwc -core-basic --out-dir outpath -min
```


Luego desde HTML
```html
<script type='text/javascript' src='core-http.js'></script>
```

o la versión mínima

```html
<script type='text/javascript' src='core-http.min.js'></script>
```


## core
core permite el uso de varias características de VW desde el navegador.

Las características implementadas son:

* Symbol
* Promise

#### Namespace: System 
* System.Exception
* System.IEnum
* System.NotImplementedException

#### Namespace: VW 
* Task
* TaskCancelledException
* Request (browser-request)

#### Namespace: VW.Http 
* Request
* RequestArgs
* HttpStatusCode

#### Namespace: VW.Ecma2015 (runtime para usar código ES6 y async/await)
* Promise
* regeneratorRuntime
* Utils


Gracias a este módulo se puede ejecutar código ES6 y async/await de ES7 en navegadores que aún no lo soportan. Para ello debe usarse en conjunto con vox el cual permite realizar transcripción de ES6/async/await a ES5. Mírese como ejemplo core-elements 



### License
MIT License



