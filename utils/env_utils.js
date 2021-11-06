exports.getEnvVariable = (envVar, jsonVar) => {
    if(envVar != "" && envVar != null) {
        return envVar
    }

    return jsonVar
}