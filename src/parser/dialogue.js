var parseDialogue = function(data, tree) {
  var fields = data.match(/Dialogue:(.*)/)[1].split(',');
  var len = tree.Events.Format.length;
  if (fields.length > len) {
    var textField = fields.slice(len - 1).join();
    fields = fields.slice(0, len - 1);
    fields.push(textField);
  }

  var timer = (tree.ScriptInfo['Timer'] / 100) || 1;
  var dia = {};
  for (var i = 0; i < len; ++i) {
    dia[tree.Events.Format[i]] = fields[i].replace(/^\s+/, '');
  }
  dia.Layer *= 1;
  dia.Start = parseTime(dia.Start) / timer;
  dia.End = parseTime(dia.End) / timer;
  dia.Style = tree.V4Styles.Style[dia.Style] ? dia.Style : 'Default';
  dia.MarginL *= 1;
  dia.MarginR *= 1;
  dia.MarginV *= 1;
  dia.Effect = parseEffect(dia.Effect);
  dia._parsedText = parseTags(dia, tree.V4Styles.Style);

  return dia;
};
