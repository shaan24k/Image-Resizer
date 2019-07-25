<b>Image Resizer</b>

This Repository will demo how to reize the single image into multiple size.

Installation
<div class="highlight highlight-source-shell"><pre>npm install</pre></div>

Run Server
<div class="highlight highlight-source-shell"><pre>node app.js</pre></div>

Resizer API
<div class="highlight highlight-source-shell">

<b>Request</b>
<pre>
BaseUrl = localhost:1000/api/auto_image_resizer
Method : POST Form data

file (type file) = abc.jpg
sizes = 127x128,500x300,1000x900  (resize image into diffrent sizes)

<b>Response</b>
{
    "success": true,
    "message": "Image resize with mode 1 successfully done."
}
</pre>
</div>

This will create folder name uploads and place original image into orginal folder and sub resize folders

Note : Test the api thorugh postman before using in project.

