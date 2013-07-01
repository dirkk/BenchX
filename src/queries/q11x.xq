let $auction := doc("xmlgen/auction.xml") return
for $p in $auction/site/people/person
let $l :=
  for $i in $auction/site/open_auctions/open_auction/initial
  where $p/profile/@income > 5000 * $i/text()
  return $i
return <items name="{$p/name/text()}">{count($l)}</items>

