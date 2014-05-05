xquery version "3.0";
(:~
: Get information about the BaseX environment, often java properties
:
: @author andy bunce
: @since sept 2012
: @licence apache 2
:)
 
module namespace env = 'apb.basex.env';
declare default function namespace 'apb.basex.env';
declare namespace sys="java.lang.System";
declare namespace Runtime="java.lang.Runtime";
declare variable $env:core:=(
            "java.version","java.vendor","java.vm.version",
            "os.name","os.version","os.arch");
            
(:~ @return BaseX version string :)
declare function basex-version() as xs:string{
db:system()/generalinformation/version
};

(:~ 
 : @return true if basex version is at least $minver e.g "7.8" 
 :)
declare function basex-minversion($minver as xs:string) as xs:boolean{
 let $v:=fn:substring-before(basex-version()," ")
 return fn:substring($v,1,fn:string-length($minver)) ge $minver
};

declare function getProperty($name as xs:string) as xs:string{
    sys:getProperty($name)
};
(: 
 : memory status
 :http://javarevisited.blogspot.co.uk/2012/01/find-max-free-total-memory-in-java.html
:)
declare function memory($human as xs:boolean)as map(*){
let $f:=if($human)then prof:human#1 else function($x){$x}
let $r:=Runtime:getRuntime()
return map{
    "memory.free":=$f(Runtime:freeMemory($r)),
    "memory.max":=$f(Runtime:maxMemory($r)),
    "memory.total":=$f(Runtime:totalMemory($r))
    }
};

(:~ useful java properties :)
declare function about() as map(*){
 let $c:= map:new($env:core!map:entry(.,sys:getProperty(.)))
 return map:new(($c,memory(fn:true())))
};