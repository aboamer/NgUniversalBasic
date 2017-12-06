export class AppUtils {


   public isEmptyObject(o) {
        return Object.keys(o).every(function (x) {
            return o[x] === '' || o[x] === null;  // or just "return o[x];" for falsy values
        });
    }

}