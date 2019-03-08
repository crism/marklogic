xquery version "1.0-ml";

module namespace plugin = "http://marklogic.com/data-hub/plugins";

declare option xdmp:mapping "false";

(:~
 : Collect IDs plugin
 :
 : @param $options - a map containing options. Options are sent from Java
 :
 : @return - a sequence of ids or uris
 :)
declare function plugin:collect(
  $options as map:map) as xs:string*
{
  (: by default we return the URIs in the same collection as the Entity name :)
  cts:uris((), (),  cts:directory-query("/hr/employee/acme/"))
};

