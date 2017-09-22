const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

function joinPath (paths) {
  return path.resolve(__dirname, paths)
}

module.exports = function (env) {
  const isProduction = env && env.production

  const config = {
    // The base directory for resolving entry points and loaders
    context: joinPath('src'),

    entry: {
      setup: 'react-hot-loader/patch',
      app: './main.js'
    },

    // The place the built files get put
    output: {
      filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
      path: joinPath('dist'),
      publicPath: '/'
    },

    // Places to look for import/requires
    resolve: {
      alias: {
        Base: joinPath('src'),
        Carbon: 'carbon-components-react',
        CarbonStyles: 'carbon-components/scss/globals/scss',
        Components: joinPath('src/components'),
        Public: joinPath('public')
      },
      modules: [
        joinPath('src'),
        'node_modules'
      ]
    },

    // Loaders to handle various files
    module: {
      noParse: /^.*\.spec\.js$/,
      rules: [
        // Use Babel for ES2015 and JSX
        {
          test: /^.+(?!\.spec).jsx?$/,
          exclude: [/node_modules/, /@apic\/apim-sdk/],
          use: ['babel-loader']
        },
        // Load images and icons
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        // Load font files
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash].[ext]'
            }
          }
        }
      ]
    },

    // Additional plugins to do nice things
    plugins: [
      // Creates an index.html file and injects the app
      new HtmlPlugin({
        title: 'My Project',
        template: joinPath('src/index.html')
      })
    ],

    // Add source maps
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map'
  }

  if (isProduction) {
    // Removes the files specified before creating builds
    config.plugins.unshift(
      new CleanPlugin(['dist'], {
        root: joinPath('.'),
        verbose: true,
        exclude: []
      })
    )

    // Split out CSS files
    config.module.rules.push({
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              data: '@import "~Base/styles/_vars.scss";'
            }
          }
        ]
      })
    })

    config.plugins.push(new ExtractTextPlugin({
      filename: 'styles.[contenthash].css'
    }))

    // Split out vendor files
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module, count) {
        const context = module.context
        return context &&
          context.indexOf('babel-polyfill') < 0 &&
          context.indexOf('node_modules') > -1
      }
    }))

    // Splits out common chunks
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'webpack',
      minChunks: Infinity
    }))

    // Put React into production mode
    config.plugins.unshift(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    )

    // Minify JS files
    config.plugins.push(new MinifyPlugin({
      keepClassName: true,
      keepFnName: true
    }))
  } else {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            data: '@import "~Base/styles/_vars.scss";'
          }
        }
      ]
    })

    // activate HMR for React
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.devServer = {
      clientLogLevel: 'warning',
      historyApiFallback: true
    }
  }

  return config
}
