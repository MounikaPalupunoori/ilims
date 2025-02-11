
const capitalize=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
const getAttributeEntity = (attributes, attributeName) => {
    const filteredAttributes = attributes.filter(
      (attr) => attr.entity === attributeName
    );
    if (filteredAttributes.length > 0) {
        return filteredAttributes;
    }
}
const getAttributeValue = (attributes,attributeName) => {
    const attribute = attributes && attributes.find(
      (attr) => attr.attributeName === attributeName
    );
    return attribute && attribute.attributeName !== '' ? attribute.attributeName : '-';
  }
  
  const getValue = (attributes,attributeName) => {
    const attribute = attributes && attributes.find(
      (attr) => attr.attributeName === attributeName
    );
    return attribute && attribute.value !== '' ? attribute.value : '-';
  }
 
    function formatDate(value) {
      if (typeof value === 'number') {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return '-';
        }
        else {
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          let hours = date.getHours();
          const minutes = ('0' + date.getMinutes()).slice(-2);
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12;
          const formattedDateTime = `${month}-${day}-${year} ${('0' + hours).slice(-2)}:${minutes} ${ampm}`;
          return formattedDateTime;
        }
      }
      else {
        return '-'
      }
  }

  const getTokenData = (queryToken) => {
    const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
    const currentDate = new Date().getTime() + 10000;
    let decryptedToken = atob(queryToken).replace(SECRET_KEY, '');
    let tokenPayload = decryptedToken.split('.').length > 1? JSON.parse(
      atob(decryptedToken.split('.')[1].replace('-', '+').replace('_', '/'))
    ): {};
    const tokenValidTill = tokenPayload?.exp? tokenPayload.exp * 1000: 0;
    let output = {
      isValid: false,
      tokenValidTill: tokenValidTill,
      token: decryptedToken,
      userName: tokenPayload?.username,
      roleId: tokenPayload?.role_id,
      userId: tokenPayload?.sub? parseInt(tokenPayload?.sub): 0,
    };
    if (tokenValidTill > currentDate) {
      output.isValid = true;
    }
    return output;
  }
  function searchParams(params, key, value) {
    if (value !== undefined && value !== null && value !== "") {
        var param = key + "=" + (value && value);
        params += params.length > 0 ? "&" + param : param;
    }
    return params;
}
const searchKeyValue=(headers,searchTerm,paramMappings)=>{
  const keyValuePairs = searchTerm.split('&');
  const arrayOfObjects = [];
  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split('=');
    const obj = { [key]: value };
    arrayOfObjects.push(obj);
  });
  const matchedArray = headers.map(label => {
    const matchingObject = arrayOfObjects.find(
        obj => Object.keys(obj)[0].toLowerCase() === label.toLowerCase()
    );
    return { [label]: matchingObject ? Object.values(matchingObject)[0] : null };
  });
  let urlParams = "";
  matchedArray.forEach(key => {
    const propName = Object.keys(key)[0];
    const mapping = paramMappings.find(m => m.key === propName);
    if (mapping) {
      urlParams = searchParams(urlParams, mapping.param, key[propName]);
    }
  });

  const matchedKeys = matchedArray.map(obj => Object.keys(obj)[0].toLowerCase());
  const errorKeys = arrayOfObjects.reduce((errors, obj) => {
    const key = Object.keys(obj)[0].toLowerCase();
    if (!matchedKeys.includes(key)) {
      errors.push(key);
    }
    return errors;
  }, []);
  return { urlParams, errorKeys };
}



export { capitalize,getAttributeValue,getAttributeEntity,getTokenData,formatDate,searchParams,searchKeyValue,getValue};
