using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.IO;
using System.Threading;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

using unvell.ReoGrid;
using System.Globalization;
using unvell.ReoGrid.DataFormat;

namespace App001
{
    
    public partial class Form1 : Form {

        private AutoResetEvent navigationCompleted;
        private string lat;
        private string lng;
        private string latClick;
        private string lngClick;
        private int zoom;
        private dynamic sheet1;
        private int row;
        private int numberMarker; 

        public Form1() {
            InitializeComponent();
            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
            this.Icon = new Icon(SystemIcons.Shield, 40, 40);
            lat = "42.810000";
            lng = "10.330000";
            zoom = 15;
            txt_latLngZoom.Text = "" + lat + " :: " + lng + " :: " + zoom;
            sheet1 = reoGridControl1.Worksheets[0];
            row = 1; 
        }

        private void print(string arg) {
            MessageBox.Show("" + arg);
        }

        private void infoToolStripMenuItem_Click(object sender, EventArgs e) {
            MessageBox.Show("App001 -- March 2025 -- Version 1.0",  "Info");
        }

        private void exitToolStripMenuItem_Click(object sender, EventArgs e) {
            Application.Exit();
        }

        private async void Form1_Load(object sender, EventArgs e) {

            navigationCompleted = new AutoResetEvent(false);

            string pathPro = "" + Directory.GetParent("" + Environment.CurrentDirectory).Parent.FullName;
            await webView21.EnsureCoreWebView2Async();

            //event
            webView21.NavigationCompleted += (_, args) => { navigationCompleted.Set(); };
            webView21.CoreWebView2.Navigate(pathPro + @"\webPage.html");
            await Task.Run(() => { navigationCompleted.WaitOne(); });

            await webView21.ExecuteScriptAsync(
                @"var map = L.map('map').setView([ " + lat + ", " + lng + " ], " + zoom + "); " +
                @"L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
                    .addTo(map);"
            );

            //event
            webView21.WebMessageReceived += (_, args) => {
                string[] temp = args.TryGetWebMessageAsString().Split('@');
                switch (temp[0]) {
                    case "mouseMove":
                        lat = temp[1];
                        lng = temp[2];
                        break;
                    case "zoomEnd":
                        zoom = Convert.ToInt32(temp[1]);
                        break;
                    case "click":
                        latClick = temp[1];
                        lngClick = temp[2];
                        numberMarker = Convert.ToInt32(temp[3]);
                        sheet1[row, 0] = "Marker" + numberMarker;
                        sheet1[row, 1] = "" + latClick;
                        sheet1[row, 2] = "" + lngClick;
                        row++;
                        break;
                }
                txt_latLngZoom.Text = "" + lat + " :: " + lng + " :: " + zoom;

            };

            await webView21.ExecuteScriptAsync(
                "map.on('mousemove', function( e ) { chrome.webview.postMessage( '' + [ 'mouseMove' , e.latlng.lat.toFixed(6) , e.latlng.lng.toFixed(6) ].join( '@' ) ); });" +
                "map.on('zoomend', function( e ) { chrome.webview.postMessage( '' + [ 'zoomEnd' , map.getZoom() ].join( '@' ) );  });"
            );

            reoGridControl1.SheetTabWidth = 200;
            sheet1.Name = "MARKERS";

            sheet1[0, 0] = "";
            sheet1[0, 1] = "Latitude";
            sheet1[0, 2] = "Longitude";

            sheet1.SetRangeDataFormat(RangePosition.EntireRange, CellDataFormatFlag.Number,
            new NumberDataFormatter.NumberFormatArgs() {
                DecimalPlaces = 6,
                //UseSeparator = true,
            });

            sheet1.SetRangeStyles(RangePosition.EntireRange, new WorksheetRangeStyle() {
                Flag = PlainStyleFlag.FontSize | PlainStyleFlag.FontName,
                FontName = "Verdana",
                FontSize = 9,
            });

            await webView21.ExecuteScriptAsync(
                "var markers = [];" + 
                "var insertMarker = false; " + 
                "var count = 0"
            );

            await webView21.ExecuteScriptAsync(
                    "map.on( 'click' , function(e) { " +
                    "   if( insertMarker == true ) {" +
                    "       tempLat = e.latlng.lat.toFixed(6); " +
                    "       tempLng = e.latlng.lng.toFixed(6); " +
                    "       count++; " +
                    "       var tempMarker = L.marker([ tempLat , tempLng ]).bindPopup(\"I'm Marker\" + count + \" - coord:\" + tempLat + \"::\" + tempLng );" +
                    "       markers.push( tempMarker ); " +
                    "       map.addLayer( markers[ count - 1 ] ); " +
                    "       chrome.webview.postMessage('' + ['click', tempLat, tempLng, count ].join('@'));" +
                    "   }" +
                    "});"
                );

            btn_ON.Click += async (_, args) => {
                btn_ON.BackColor =  Color.FromArgb( 255, 192, 255, 192 );
                await webView21.ExecuteScriptAsync(
                    "insertMarker = true; "
                );
                
            };

            btn_OFF.Click += async (_, args) => {
                btn_ON.BackColor = SystemColors.ControlLightLight;
                await webView21.ExecuteScriptAsync(
                    "insertMarker = false; " + 
                    "for( var i = 0; i < markers.length; i++ ) {" +
                    "   map.removeLayer( markers[ i ] )" + 
                    "}" + 
                    "markers = [];" + 
                    "count = 0"
                );
                
                sheet1.Reset(200, 200);
                sheet1[0, 0] = "";
                sheet1[0, 1] = "Latitude";
                sheet1[0, 2] = "Longitude";
                row = 1;

                sheet1.SetRangeDataFormat(RangePosition.EntireRange, CellDataFormatFlag.Number,
                    new NumberDataFormatter.NumberFormatArgs() {
                    DecimalPlaces = 6,
                    //UseSeparator = true,
                });

            };

        }

        
    }    
}

