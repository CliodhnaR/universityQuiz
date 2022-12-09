var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

const PORT = process.env.PORT
// const PORT = 8080;

http.createServer(function (req, res) 
  {

	  if (req.url == "/")
	  {

		  let tempString = '<div id="result"></div> </body> </html>'

		  file = 'finalProjIdx.html';
		  fs.readFile(file, function(err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
			res.write(tempString);
            res.end();
		  });
	  }
	  else if (req.url.includes("?"))
	  {

		const MongoClient = require('mongodb').MongoClient;
		const connStr = 'mongodb+srv://creidy02:Danny0512!@cluster0.2ygoinn.mongodb.net/myFirstDatabase';

		client = new MongoClient(connStr,{ useUnifiedTopology: true });

		// $("input[type='submit']").click(async function() {

		const testing = async() => {
			try {
				// connect to client + open collection
				await client.connect();
				var dbo = client.db('universitiesData');
				var collection = dbo.collection('allUniversitiesFinal');


				// get input from URL
				var qobj = url.parse(req.url, true).query;
				// separate parameters
				let params = new URLSearchParams(qobj);
				let location = params.get('location');
				let tuition = params.get('tuition');
                let act = params.get('act');
                let satMath = params.get('satMath');
                let satEng = params.get('satEng');
                let library = params.get('library');
                let major = params.get('major');
                let population = params.get('population');

                let allChoices = [location, tuition, act, satMath, satEng, library, major, population];
            

				let index = allChoices.length -1;

                // remove any "N/A" responses
                while (index >=0){
                    if(allChoices[index] == 'none') {
                        allChoices.splice(index,1)
                    }
                    index--;
                }
         
                // create a QBE query with an array for all of the answers
                var wrapper = {"$and": []};

                // loop through choices and add all requested choices to wrapper
                for await(const item of allChoices){
                    if(item == location){
                        let gtLong = 0;
                        let ltLong = 0;
                        let gtLat = 0;
                        let ltLat = 0;
                        if(location == "Northeast"){
                            gtLat = 37;
                            ltLat = 50;
                            gtLong = -85;
                            ltLong = -60;
                        }
                        else if(location == "South"){
                            gtLat = 0;
                            ltLat = 37;
                            gtLong = -105;
                            ltLong = -70;
                        }
                        else if(location == "Midwest"){
                            gtLat = 35;
                            ltLat = 50;
                            gtLong = -115;
                            ltLong = -90;
                        }
                        else if(location == "West"){
                            gtLat = 30;
                            ltLat = 50;
                            gtLong = -130;
                            ltLong = -112;
                        }
                        var tempLat = {latitude: {$gt: gtLat, $lt: ltLat}};
                        var tempLong = {longitude: {$gt: gtLong, $lt: ltLong}};
                        wrapper["$and"].push(tempLat);
                        wrapper["$and"].push(tempLong);
                    }
                    else if(item == tuition){
                        let max = 0;
                        let min = 0;
                        if(tuition == "seventy"){
                            min = 70000;
                            max = 99999999;
                        }
                        else if(tuition == "fifty"){
                            max = 70000;
                            min = 50000;
                        }
                        else if(tuition == "thirty"){
                            max = 50000;
                            min = 30000;
                        }
                        else if(tuition == "ten"){
                            max = 30000;
                            min = 10000;
                        }
                        else if(tuition == "seven"){
                            max = 10000;
                            min = 7000;
                        }
                        else if(tuition == "lessThan"){
                            max = 7000;
                            min = 0;
                        }
                        var tempPrice = {outState: {$gt: min, $lt: max}};
                        wrapper["$and"].push(tempPrice);
                    }
                    else if(item == act){
                        let max = 0;
                        let min = 0;
                        if(act == "oneA"){
                            max = 37;
                            min = 32;
                        }
                        else if(act == "twoA"){
                            max = 33;
                            min = 28;
                        }
                        else if(act == "threeA"){
                            max = 29;
                            min = 24;
                        }
                        else if(act == "fourA"){
                            max = 25;
                            min = 20;
                        }
                        else if(act == "fiveA"){
                            max = 21;
                            min = 18;
                        }
                        else if(act == "sixA"){
                            max = 17;
                            min = 0;
                        }
                        var tempACT = {ACTcomp21: {$gt: min, $lt: max}};
                        wrapper["$and"].push(tempACT);
                    }
                    else if(item == satMath){
                        if(satMath == "oneSM"){
                            max = 801;
                            min = 739;
                        }
                        else if(satMath == "twoSM"){
                            max = 740;
                            min = 659;
                        }
                        else if(satMath == "threeSM"){
                            max = 660;
                            min = 579;
                        }
                        else if(satMath == "fourSM"){
                            max = 580;
                            min = 499;
                        }
                        else if(satMath == "fiveSM"){
                            max = 500;
                            min = 439;
                        }
                        else if(satMath == "sixSM"){
                            max = 440;
                            min = 0;
                        }
                        var tempSAT = {SATmath21: {$gt: min, $lt: max}};
                        wrapper["$and"].push(tempSAT);
                    }
                    else if(item == satEng){
                        if(satEng == "oneSE"){
                            max = 801;
                            min = 739;
                        }
                        else if(satEng == "twoSE"){
                            max = 740;
                            min = 659;
                        }
                        else if(satEng == "threeSE"){
                            max = 660;
                            min = 579;
                        }
                        else if(satEng == "fourSE"){
                            max = 580;
                            min = 499;
                        }
                        else if(satEng == "fiveSE"){
                            max = 500;
                            min = 439;
                        }
                        else if(satEng == "sixSE"){
                            max = 440;
                            min = 0;
                        }
                        var tempSAT = {SATread21: {$gt: min, $lt: max}};
                        wrapper["$and"].push(tempSAT);
                    }
                    else if(item == library){
                        var result;
                        if(library == "digital"){
                            result = "1"
                        }
                        else if(library == "physical"){
                            result = "2"
                        }
                        var tempLib = {elecLibrary: result};
                        wrapper["$and"].push(tempLib);
                    }
                    else if(item == major){
                        var majMen;
                        var majWomen;
                        if(major == "edu"){
                            majMen = {educationMen: {$gt: 0}};
                            majWomen = {educationWomen: {$gt: 0}};
                        }
                        else if(major == "eng"){
                            majMen = {engineeringMen: {$gt: 0}};
                            majWomen = {engineeringWomen: {$gt: 0}};
                        }
                        else if(major == "bio"){
                            majMen = {bioMen: {$gt: 0}};
                            majWomen = {bioWomen: {$gt: 0}};
                        }
                        else if(major == "math"){
                            majMen = {mathMen: {$gt: 0}};
                            majWomen = {mathWomen: {$gt: 0}};
                        }
                        else if(major == "science"){
                            majMen = {sciMen: {$gt: 0}};
                            majWomen = {sciWomen: {$gt: 0}};
                        }
                        else if(major == "business"){
                            majMen = {busiMen: {$gt: 0}};
                            majWomen = {busiWomen: {$gt: 0}};
                        }
                        else if(major == "law"){
                            majMen = {lawMen: {$gt: 0}};
                            majWomen = {lawWomen: {$gt: 0}};
                        }
                        else if(major == "dentist"){
                            majMen = {dentistMen: {$gt: 0}};
                            majWomen = {dentistWomen: {$gt: 0}};
                        }
                        else if(major == "medicine"){
                            majMen = {medicineMen: {$gt: 0}};
                            majWomen = {medicineWomen: {$gt: 0}};
                        }
                        wrapper["$and"].push(majMen);
                        wrapper["$and"].push(majWomen);
                    }
                    else if(item == population){
                        let max = 0;
                        let min = 0;
                        if(population == "huge"){
                            max = 999999;
                            min = 30000;
                        }
                        else if(population == "large"){
                            max = 30000;
                            min = 15000;
                        }
                        else if(population == "medium"){
                            max = 15000;
                            min = 5000;
                        }
                        else if(population == "small"){
                            max = 5000;
                            min = 0;
                        }
                        var tempPop = {allUndergrad: {$gt: min, $lt: max}};
                        wrapper["$and"].push(tempPop);
                    }
                }

                var toPrint = "";

                let allData = collection.find(wrapper);

                await allData.forEach(function(item){
                    // check that numbers exist
                    let allResponses = [item.ACTcomp21, item.SATmath21, item.SATread21, item.allUndergrad];
                    for(let i = 0; i < allResponses.length; i++){
                        if(isNaN(allResponses[i])){
                            allResponses[i] = "Not available.";
                        }
                    }
                    // check tuition, add dollar sign if needed
                    let tuition = "Not available."
                    if(!(isNaN(item.outState))){
                        tuition = "$" + item.outState;
                    }
                    // check if mission exisits, replace with URL if possible
                    let mission = "Not available."
                    if(item.mission != ""){
                        mission = item.mission;
                    }
                    else {
                        if(item.missionURL != ""){
                            mission = "<a href='" + item.missionURL + "'>" + item.missionURL + "</a>";
                        }
                    }
                    // print data
                    toPrint += item.name + ": <ul><li>Average ACT Score: " + allResponses[0] + "</li><li>Average SAT Math Score: " + allResponses[1] +
                        "</li><li>Average SAT Reading Score: " + allResponses[2] + "</li><li>Out of State Tuition: " + tuition +
                        "</li><li>Undergraduate population: " + allResponses[3] + "</li><li>City: " + item.city +
                        "</li><li>Mission statement: " + mission + " </li></ul><br/>"
                });
                
				// change result
				let tempString = '<br/><div id="result">'+ toPrint +'</div> <div class="footer">' +
                                 '<div class = "foot_left"> <p>Hours of operation: 9:00am - 5:00pm</p> <p>Phone: (555)-555-5555</p>' +
                                 '<p>Email: support@collegefinder.com</p> </div> <div class = "foot_right">' +
                                 '<a class = "footHome" href="index.html">CollegeFinder</a> </div></div> </body> </html> '

				// reload page
				file = 'finalProjIdx.html';
				fs.readFile(file, function(err, txt) {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(txt);
					res.write(tempString);
					res.end();
				});

			}
			catch(err) {
				console.log("Database error: " + err);
			}
			finally {
				client.close();
			}
		};
		// call function
		testing();
		
	  }
	  else 
	  {

		  res.writeHead(200, {'Content-Type':'text/html'});
		  res.write ("Unknown page request");
		  res.end();
	  }
  

}).listen(PORT);
