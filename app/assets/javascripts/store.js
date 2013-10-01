// Timinator.ApplicationAdapter = DS.FixtureAdapter.extend({
// Timinator.ApplicationAdapter = DS.RESTAdapter.extend({
Timinator.ApplicationAdapter = DS.ActiveModelAdapter.extend({
    queryFixtures: function(fixtures, query, type) {
        console.log(query);
        console.log(type);
        console.log(fixtures);

        var records = fixtures.filter(function(item) {
            for(var prop in query) {
                if( item[prop] != query[prop]) {
                    return false;
                }
            }
            return true;
        });

        console.log(records);

        return records;
    }
});