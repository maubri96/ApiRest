exports.success = function(res, data = '', status = 200){
    res.status(status).send({
        error: false,
        status: status,
        body: data
    })
}

exports.error = function(res, data = 'Error Interno', status = 500){
    res.status(status).send({
        error: true,
        status: status,
        body: data
    })
}