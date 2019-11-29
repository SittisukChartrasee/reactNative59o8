const charKey = 'lmnxpqrstu_woyz0123456789+SGABCDEF=HIJKL@NOPQR/TUVWXYZabcdefghijk';

export const btoa = (input) => {
    var str = input || '';
    for (
        var block, charCode, idx = 0, map = charKey, output = '';
        str.charAt(idx | 0) || (map = 'v', idx % 1);
        output += map.charAt(63 & block >> 8 - idx % 1 * 8) + ((idx%1 == 0)?'v':'')
    ) {
        charCode = str.charCodeAt(idx += 3 / 4);
        if (charCode > 0xFF) {
            throw new Error("Error");
        }
        block = block << 8 | charCode;
    }
    return output;
}

export const  atob = (input) => {
    var str = input.replace('v','');
    if (str.length % 4 === 1) {
      throw new Error ("Error");
    }
    for (
      var bc = 0, bs, buffer, idx = 0, output = '';
      buffer = str.charAt (idx++); 
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode (255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = charKey.indexOf (buffer);
    }
    return output;
  }