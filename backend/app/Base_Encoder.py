encoder='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
def Base62_Encoding(counter):
    returnable_string=""
    if (counter==0):
        return returnable_string+str('0')
    while (counter>0):
        rem= counter % 62
        returnable_string=returnable_string+encoder[rem]
        counter //=62
    return ''.join(reversed(returnable_string))
