cfg.Light, cfg.Portrait, cfg.MUI;

function OnStart()
{

    var lay = app.CreateLayout( "linear","FillXY" );
var web = app.CreateWebView( 1, -1, "Overview,AllowZoom");
web.LoadUrl( "template.html" );
lay.AddChild( web )
    var lista = app.GetInstalledApps();

    lst = app.CreateList( "", 0, 0,"Menu" );
    lay.AddChild( lst );
		item = app.ReadFile( "item.html" );
		s = "";
    for(var i in lista) {
    
    //list.join(",\n");
    //zip.Close();
        var a = lista[i];
        var zip = app.CreateZipUtil();
    zip.Open( a.publicSourceDir );
    var list = zip.List("").split(",");
    //alert(list.join("\n"));
        s=item.replace("[PACKAGENAME]", a.packageName).replace("[CLASSNAME]",a.className).replace("[UID]",a.uid).replace("[TARGETSDKVERSION]", a.targetSdkVersion).replace("[DATADIR]",a.dataDir).replace("[SOURCEDIR]", a.sourceDir).replace("[PUBLICSOURCEDIR]", a.publicSourceDir).replace("[ASSETS]", list.join("\r\n"));
        lst.AddItem(a.packageName);
        zip.Close();
        app.WriteFile( "results.html", s, "Append" );
        app.ShowPopup( a.packageName );
    }
  
    web.LoadUrl( "results.html" )
    //web.Execute( "document.getElementById('CHUNK').innerHTML='"+ s+"'");//document.body.outerHTML +"=s")
    app.AddLayout(lay);
}