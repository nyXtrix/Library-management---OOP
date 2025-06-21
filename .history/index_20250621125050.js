  class User {
   constructor(id,name){
    if(new.target === User){
        throw new Error ()
    }
    this.id=id
    this.name=name
   }

   toString(){
    return 
   }

  }