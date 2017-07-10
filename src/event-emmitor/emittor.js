var exec = require('child_process').exec;
var http = require('http')
var containerId

module.exports = function (imas) {
    return new Promise((resolve, reject) => {
        getDockerContainerId()
            .then(id => {
                saveUrlMeta(imas)
            })
            .catch(err => reject(err))

        resolve()
    })

}

function getDockerContainerId() {
    return new Promise((resolve, reject) => {
        if (containerId) {
            console.log('container id is already resolved')
            resolve(containerId)
        } else {
            console.log('resolving the container id')
            exec('cat \/proc\/self\/cgroup | grep \"cpu:\/\" | sed \'s\/\\([0-9]\\):cpu:\\\/docker\\\/\/\/g\'',
            function (error, stdout, stderr) {
                if (!error) {
                    containerId = stdout
                    resolve(containerId);
                } else {
                    reject(error)
                }
            })
        }
    })


    //cat \/proc\/self\/cgroup | grep \"cpu:\/\" | sed \'s\/\\([0-9]\\):cpu:\\\/docker\\\/\/\/g\'
}


function saveUrlMeta(imas) {
    imas.inboundType = "2"
    imas.containerId = containerId
    imas.tag = process.env.IMAS_TAG //|| 'service_three'

    var data = JSON.stringify(imas)
    return new Promise((resolve, reject) => {
        var options = {
            host: '10.131.63.120',
            port: 8080,
            path: '/imas-data-collector/api/data',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers))
            res.setEncoding('utf8')
            res.on('data', function (chunk) {
                //console.log('BODY: ' + chunk);
            })
        })

        req.write(data)
        req.end()

        resolve()
    });
}

