const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  var id = counter.getNextUniqueId((err, id) => {
    //you can access to id 
    fs.writeFile(path.join(exports.dataDir + `/${id}.txt`), text, (err) => {
      if (err) {
        throw ('error making file');
      } else {
        callback(null, { id, text });
      }
    })
    //you have to create a text file with fs.writeFile
  });
};

exports.readAll = (callback) => {
  // ["00001.text", "00002.text"]
  // fs.dosomething() 
  // newArrayy = [{}, {}, {}] 
  // let newArray = [].map (item => {
         //read one item
  //})
  fs.readdir(exports.dataDir, (err, data) => {
    // console.log(data);
    // ///Users/student/code/hrla29-cruddy-todo/test/testData[ '00001.txt', '00002.txt' ]
    // console.log('this is ' + data[0]);
    // console.log(Array.isArray(data));
    // console.log(data.length);

    var newMap = data.map(item => {
      var obj = {};
      obj.id = item.substring(0,5);
      obj.text = item.substring(0,5);
      return obj;
    })

    console.log(newMap);
    callback(null, newMap)
  })
}

exports.readOne = (id, callback) => {

  fs.readFile(path.join(exports.dataDir , `${id}.txt`), (err, data) => {
    if(err) {
      callback(new Error(`No item with id: ${id}`))
    } else {
      text = data.toString()
      // return fileData
      // console.log('this is what you are looking for ', JSON.parse(fileData))
      callback(null, {id, text})
    }
  })

};

exports.update = (id, text, callback) => {
  
  fs.readFile(path.join(exports.dataDir , `${id}.txt`), (err, data) => {
    if(err) {
      callback(new Error(`No item with id: ${id}`))
    } else {
      fs.writeFile(path.join(exports.dataDir , `${id}.txt`), text, (err) => {
        if (err) {
          callback(new Error(`No item with id: ${id}`))
        } else {
          callback(null, text);
        }
      });
    }
  })

};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  fs.readFile(path.join(exports.dataDir , `${id}.txt`), (err, data) => {
    if (err) {
      callback (new Error(`No item with id: ${id}`))
    } else {
      fs.unlink(path.join(exports.dataDir , `${id}.txt`), (err) => {
        if (err) {
          callback(new Error(`No item with id: ${id}`));
        } else {
          callback(null, err)
        }
      });
    }
  })

};


//   if (!item) {
//     // report an error if item not found
//     callback(new Error(`No item with id: ${id}`));
//   } else {
//     callback();
//   }


// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
