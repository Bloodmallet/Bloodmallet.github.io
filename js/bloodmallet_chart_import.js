/******************************************************************************
 * Script to include charts from bloodmallet.com.
 * Adding a link to bloodmallet.com as the origin is appreciated.
 * Please consider supporting the project via Patreon or Paypal.
 *
 * https://www.patreon.com/bloodmallet
 * https://www.paypal.me/bloodmallet
 *
 * Requirements:
 *    - Highcharts license on your end (if you're a commercial website)
 *    - include Highcharts scripts before this script
 *
 * The script collects all elements with the class 'bloodmallet_chart'
 *
 * Minimal example of a patchwerk trinket chart for elemental shamans:
 * <div id="hello-world" class="bloodmallet_chart" data-wow-class="shaman" data-wow-spec="elemental"></div>
 *
 * Maximum alternative to the previous example:
 * <div id="hello-world-verbose" class="bloodmallet_chart" data-wow-class="shaman" data-wow-spec="elemental" data-type="trinkets" data-fight-style="patchwerk" data-tooltip-engine="wowhead" data-background-color="#343a40" data-font-color="#f8f9fa"></div>
 *
 *  Scheme:
 *    required:
 *      id="something-unique"
 *      class="bloodmallet_chart"
 *      data-wow-class="[wow_class]"
 *      data-wow-spec="[wow_spec]"
 *    optional:
 *      data-type="[data_type]"
 *      data-fight-style="[fight_style]"
 *      data-tooltip-engine="[tooltip_engine]"
 *      data-background-color="[color]"
 *      data-font-color="[color]"
 *
 *  [data_type]
 *    trinkets - default
 *    azerite_items_chest
 *    azerite_items_head
 *    azerite_items_shoulders
 *    azerite_traits_itemlevel
 *    azerite_traits_stacking
 *
 *  [fight_style]
 *    patchwerk - default
 *    hecticaddcleave
 *
 *  [wow_class]:
 *    death_knight
 *    demon_hunter
 *    ...
 *
 *  [wow_spec]
 *    blood
 *    frost
 *    unholy
 *    havoc
 *    vengeance
 *    ...
 *
 *  [tooltip_engine]
 *    wowhead - default
 *    wowdb
 *    none
 *
 *  [color]
 *    red
 *    #343a40
 *    ...
 *
 */

/**
 * Variable determines how many bars are visible
 */
var shown_entries = 7;

/**
 * Options:
 *  wowhead - default
 *  wowdb
 */
var default_tooltip_origin = "wowhead";

var bar_colors = [
  "#7cb5ec",
  "#d9d9df",
  "#90ed7d",
  "#f7a35c",
  "#8085e9",
  "#f15c80",
  "#e4d354",
  "#2b908f",
  "#f45b5b",
  "#91e8e1"
];

var default_font_color = "#f8f9fa";
var grey_color = "#828282";
var default_background_color = "#343a40";

var font_size = "1.1rem";

/**
 * options:
 *  patchwerk - default
 *  hecticaddcleave
 */
var default_fight_style = "patchwerk";

/**
 * options:
 *   trinkets - default
 *   azerite_items_chest
 *   azerite_items_head
 *   azerite_items_shoulders
 *   azerite_traits_itemlevel
 *   azerite_traits_stacking
 */
var default_data_type = "trinkets";

/******************************************************************************
 * Actual code starts here.
 * The toggles you want are all above this section.
 */

var dev_mode = false;

var data_type = default_data_type;
var fight_style = default_fight_style;
var background_color = default_background_color;
var font_color = default_font_color;
var tooltip_origin = default_tooltip_origin;

var empty_chart = {
  chart: {
    type: "bar",
    backgroundColor: background_color,
    style: {
      fontFamily: "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\""
    }
    //borderColor: grey_color,
    //borderWidth: 1
  },
  colors: bar_colors,
  legend: {
    align: "right",
    backgroundColor: background_color,
    borderColor: grey_color,
    borderWidth: 1,
    floating: false,
    itemMarginBottom: 3,
    itemMarginTop: 3,
    layout: 'horizontal',
    reversed: true,
    shadow: false,
    verticalAlign: "bottom",
    x: 0,
    y: 0,
    itemStyle: {
      color: font_color,
    },
    itemHoverStyle: {
      color: font_color,
    }
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: false,
      },
    },
    series: {
      stacking: "normal",
      borderColor: background_color,
      events: {
        legendItemClick: function () { return false; }
      },
      style: {
        textOutline: false,
        fontSize: font_size,
      }
    }
  },
  series: [
    {
      color: font_color,
      data: [
        1,
        1,
        3,
        1,
        3
      ],
      name: "b main",
      showInLegend: false
    },
    {
      color: background_color,
      data: [
        0,
        0,
        0,
        1,
        0
      ],
      name: "b's emptiness",
      showInLegend: false
    }, {
      color: font_color,
      data: [
        0,
        0,
        0,
        1,
        0
      ],
      name: "b's finishing touch",
      showInLegend: false
    }
  ],
  title: {
    text: "Loading...", //"Title placeholder",
    useHTML: true,
    style: {
      color: font_color,
      fontSize: font_size
    }
  },
  subtitle: {
    text: "...from <a href=\"https://bloodmallet.com\">bloodmallet.com</a>",
    useHTML: true,
    style: {
      color: font_color,
      fontSize: font_size
    }
  },
  tooltip: {
    formatter: function () {
      let s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
      s += background_color;
      s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">';
      s += this.x;
      s += '</div>';
      let cumulative_amount = 0;
      for (var i = this.points.length - 1; i >= 0; i--) {
        cumulative_amount += this.points[i].y;
        if (this.points[i].y !== 0) {
          s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
            this.points[i].series.color + ';' +
            ' padding-left: 4px;\">' +
            this.points[i].series.name +
            '</span>:&nbsp;&nbsp;' +
            Intl.NumberFormat().format(cumulative_amount) +
            "</div>";
        }
      }
      s += '</div>';
      return s;
    },
    headerFormat: "<b>{point.x}</b>",
    shared: true,
    backgroundColor: background_color,
    borderColor: grey_color,
    style: {
      color: font_color,
      fontSize: font_size,
    },
    useHTML: true,
    // adding this as a potential tooltip positioning fix. changes tooltip position to be inside the bar rather than at the end
    positioner: function (boxWidth, boxHeight, point) {
      return {
        x: point.plotX,
        y: point.plotY
      };
    }
  },
  xAxis: {
    categories: [
      "",
      "",
      "",
      "",
      "",
    ],
    labels: {
      useHTML: true,
      style: {
        color: font_color,
        fontSize: font_size,
      }
    },
    gridLineWidth: 0,
    gridLineColor: grey_color,
    lineColor: grey_color,
    tickColor: grey_color
  },
  yAxis: {
    labels: {
      //enabled: true,
      style: {
        color: grey_color
      },
    },
    min: 0,
    stackLabels: {
      enabled: true,
      formatter: function () {
        return Intl.NumberFormat().format(this.total);
      },
      style: {
        color: font_color,
        textOutline: false,
        fontSize: font_size,
        fontWeight: "normal"
      }
    },
    title: {
      text: "\u0394 Damage per second",
      style: {
        color: grey_color
      }
    },
    gridLineWidth: 1,
    gridLineColor: grey_color
  }
};

var path_to_data = "https://bloodmallet.com/json/";

/**
 * Data categories.
 * html_ids of matching elements will be added to these arrays for later
 * data insertion.
 * Scheme
 *  {
 *    [data_type]: {
 *      [fight_style]: {
 *        [wow_class]: {
 *          [wow_spec]: [
 *            {html_id: chart},
 *            {html_id: chart},
 *            ...
 *          ]
 *        }
 *      }
 *    }
 *  }
 */
var bloodmallet_charts = {};

/**
 * Scheme
 *  {
 *    [data_type]: {
 *      [fight_style]: {
 *        [wow_class]: {
 *          [wow_spec]: data
 *        }
 *      }
 *    }
 *  }
 */
var loaded_data = {};

/**
 *
 * Functions
 *
 */

// Load data on document load
document.addEventListener("DOMContentLoaded", function () {
  if (dev_mode) {
    console.log("addEventListener to DOMContentLoaded");
  }

  // scan for divs / what data is wanted
  let chart_list = document.getElementsByClassName("bloodmallet_chart");
  for (const html_element of chart_list) {
    let html_id = html_element.id;
    if (html_element) {

      // optional input
      if (html_element.getAttribute("data-fight-style")) {
        fight_style = html_element.getAttribute("data-fight-style");
      }
      if (html_element.getAttribute("data-type")) {
        data_type = html_element.getAttribute("data-type");
      }
      if (html_element.getAttribute("data-background-color")) {
        background_color = html_element.getAttribute("data-background-color");
      }
      if (html_element.getAttribute("data-font-color")) {
        font_color = html_element.getAttribute("data-font-color");
      }
      if (html_element.getAttribute("data-tooltip-engine")) {
        tooltip_origin = html_element.getAttribute("data-tooltip-engine");
      }

      // preparing necessary input to load data
      let requirements = true;
      if (!html_element.getAttribute("data-wow-class")) {
        console.log("Required 'data-wow-class' attribute wasn't found in " + html_id + ".")
        requirements = false;
      }
      let wow_class = html_element.getAttribute("data-wow-class");
      if (!html_element.getAttribute("data-wow-spec")) {
        console.log("Required 'data-wow-spec' attribute wasn't found in " + html_id + ".")
        requirements = false;
      }
      let wow_spec = html_element.getAttribute("data-wow-spec");

      if (!bloodmallet_charts[data_type]) {
        bloodmallet_charts[data_type] = {};
      }
      if (!bloodmallet_charts[data_type][fight_style]) {
        bloodmallet_charts[data_type][fight_style] = {};
      }
      if (!bloodmallet_charts[data_type][fight_style][wow_class]) {
        bloodmallet_charts[data_type][fight_style][wow_class] = {};
      }
      if (!bloodmallet_charts[data_type][fight_style][wow_class][wow_spec]) {
        bloodmallet_charts[data_type][fight_style][wow_class][wow_spec] = [];
      }

      // create new chart without data
      let new_chart = false;
      try {
        new_chart = Highcharts.chart(html_id, empty_chart);
      } catch (error) {
        console.log("When trying to create a Highcharts Chart the following error occured. Did you include the necessary Highcharts scripts?");
        console.log(error);
        return;
      }

      // save new chart for later
      let key_value = {};
      key_value[html_id] = new_chart;
      bloodmallet_charts[data_type][fight_style][wow_class][wow_spec].push(key_value);

      update_chart_style(new_chart);

      // reset style to defaults
      background_color = default_background_color;
      font_color = default_font_color;
      tooltip_origin = default_tooltip_origin;

      if (requirements) {
        load_data(data_type, wow_class, wow_spec, fight_style);
      } else {
        requirements_error(key);
      }

      // reset remaining defaults
      fight_style = default_fight_style;
      data_type = default_data_type;
    }
  }
  setTimeout(update_charts, 2 * 1000);
});

/**
 *
 * @param {string} data_type what kind of data will be looked for
 * @param {string} wow_class wow class name
 * @param {string} wow_spec wow spec name
 * @param {string} fight_style simc baseline fight style
 */
function load_data(data_type, wow_class, wow_spec, fight_style) {
  if (dev_mode) {
    console.log("load_data");
  }

  // early exit if the data is already present
  try {
    if (loaded_data[data_type][fight_style][wow_class][wow_spec]) {
      return;
    }
  } catch (error) {
    if (dev_mode) {
      console.log("Data needs to be loaded.");
    }
  }

  let data_group = data_type;

  // partial fix to link to get data
  if (data_group.indexOf("azerite") > -1) {
    data_group = "azerite_traits";
  }

  let data_name = wow_class;
  data_name += "_" + wow_spec;
  if (data_type.indexOf("azerite_items") > -1) {
    data_name += data_type.replace("azerite_items", "");
  }
  data_name += "_" + fight_style;
  data_name += ".json";

  fetch(path_to_data + data_group + "/" + data_name)
    .then(function (response) {
      if (response.status !== 200) {
        console.log('Problem occured when fetching data from bloodmallet.com. Status Code: ' +
          response.status);
        return false;
      }
      response.json().then(function (json) {

        if (!loaded_data[data_type]) {
          loaded_data[data_type] = {};
        }
        if (!loaded_data[data_type][fight_style]) {
          loaded_data[data_type][fight_style] = {};
        }
        if (!loaded_data[data_type][fight_style][wow_class]) {
          loaded_data[data_type][fight_style][wow_class] = {};
        }

        loaded_data[data_type][fight_style][wow_class][wow_spec] = json;
      });
    }).catch(function (err) {
      console.log('Fetching data from bloodmallet.com encountered an error', err);
    });
}

/**
 * Update all charts with data from bloodmallet.com
 */
function update_charts() {
  if (dev_mode) {
    console.log("update_charts");
  }

  // loop to find all created charts
  for (const data_type in bloodmallet_charts) {
    if (bloodmallet_charts.hasOwnProperty(data_type)) {
      if (dev_mode) {
        console.log(data_type);
      }

      for (const fight_style in bloodmallet_charts[data_type]) {
        if (bloodmallet_charts[data_type].hasOwnProperty(fight_style)) {
          if (dev_mode) {
            console.log(fight_style);
          }

          for (const wow_class in bloodmallet_charts[data_type][fight_style]) {
            if (bloodmallet_charts[data_type][fight_style].hasOwnProperty(wow_class)) {
              const wow_class_data = bloodmallet_charts[data_type][fight_style][wow_class];
              if (dev_mode) {
                console.log(wow_class);
                console.log(wow_class_data);
              }

              for (const wow_spec in wow_class_data) {
                if (wow_class_data.hasOwnProperty(wow_spec)) {
                  if (dev_mode) {
                    console.log(wow_spec);
                  }

                  for (const key_value of wow_class_data[wow_spec]) {
                    if (dev_mode) {
                      console.log(key_value);
                    }

                    for (const key in key_value) {
                      if (key_value.hasOwnProperty(key)) {
                        let chart = key_value[key];

                        const data = loaded_data[data_type][fight_style][wow_class][wow_spec];

                        let html_element = document.getElementById(key);

                        // Azerite Trait stacking uses the second sorted data key list
                        if (data_type == "azerite_traits_stacking") {
                          var dps_ordered_keys = data["sorted_data_keys_2"].slice(0, shown_entries);
                          var baseline_dps = data["data"]["baseline"][data["simulated_steps"][0]];

                        } else {
                          var dps_ordered_keys = data["sorted_data_keys"].slice(0, shown_entries);
                          var baseline_dps = data["data"]["baseline"][data["simulated_steps"][data["simulated_steps"].length - 1]];
                        }
                        if (dev_mode) {
                          console.log(dps_ordered_keys);
                          console.log("Baseline dps: " + baseline_dps);
                        }


                        // set title and subtitle
                        chart.setTitle({
                          text: data["title"]
                        }, {
                            text: data["subtitle"]
                          },
                          false
                        );

                        // clear initial data
                        while (chart.series[0]) {
                          chart.series[0].remove(false);
                        }

                        // update categories
                        category_list = [];

                        for (let dps_key of dps_ordered_keys) {
                          category_list.push(get_category_name(dps_key, data));
                        }

                        if (dev_mode) {
                          console.log(category_list);
                        }

                        // rewrite the trinket names
                        chart.update({
                          xAxis: {
                            categories: category_list
                          }
                        }, false);


                        if (data_type == "azerite_traits_stacking") {
                          let base_ilevel = data["simulated_steps"][0].replace("1_", "");
                          var simulated_steps = [];
                          simulated_steps.push("3_" + base_ilevel);
                          simulated_steps.push("2_" + base_ilevel);
                          simulated_steps.push("1_" + base_ilevel);
                        } else {
                          var simulated_steps = data["simulated_steps"];
                        }
                        if (dev_mode) {
                          console.log("simulated_steps: " + simulated_steps);
                        }

                        for (let itemlevel_position in simulated_steps) {

                          let itemlevel = simulated_steps[itemlevel_position];
                          var dps_array = [];

                          for (let dps_key of dps_ordered_keys) {

                            let dps_key_values = data["data"][dps_key];

                            // check for zero dps values and don't change them
                            if (Number(dps_key_values[itemlevel]) > 0) {

                              // if lowest itemlevel is looked at, substract baseline
                              if (itemlevel_position == simulated_steps.length - 1) {

                                if (itemlevel in dps_key_values) {
                                  dps_array.push(dps_key_values[itemlevel] - baseline_dps);
                                } else {
                                  dps_array.push(0);
                                }

                              } else { // else substract lower itemlevel value of same item

                                // if lower itemlevel is zero we have to assume that this item needs to be compared now to the baseline
                                if (dps_key_values[simulated_steps[String(Number(itemlevel_position) + 1)]] == 0 || !(simulated_steps[String(Number(itemlevel_position) + 1)] in dps_key_values)) {

                                  dps_array.push(dps_key_values[itemlevel] - baseline_dps);

                                } else { // standard case, next itemlevel is not zero and can be used to substract from the current value

                                  dps_array.push(dps_key_values[itemlevel] - dps_key_values[simulated_steps[String(Number(itemlevel_position) + 1)]]);
                                }

                              }

                            } else {
                              if (itemlevel in dps_key_values) {
                                dps_array.push(dps_key_values[itemlevel]);
                              } else {
                                dps_array.push(0);
                              }
                            }
                          }

                          chart.addSeries({
                            data: dps_array,
                            name: itemlevel,
                            showInLegend: true
                          }, false);

                        }

                        html_element.style.height = 200 + dps_ordered_keys.length * 30 + "px";
                        chart.setSize(html_element.style.width, html_element.style.height);
                        chart.redraw();

                      }
                    }

                  }

                }
              }

            }
          }

        }
      }

    }
  }
}

/**
 *
 * @param {string} key name of the div/chart
 * @param {json} data loaded data from bloodmallet.com for this chart
 */
function get_category_name(key, data) {
  if (dev_mode) {
    console.log("get_category_name");
    console.log(key);
    console.log(data);
  }

  // start constructing links
  // wowhead, wowdb, or plain text if no matching origin is provided

  // fallback
  if (tooltip_origin != "wowhead" && tooltip_origin != "wowdb") {
    return key;
  }

  // wowhead
  if (tooltip_origin == "wowhead") {
    let link = "<a href=\"https://www.wowhead.com/";
    try {
      let item_id = data["item_ids"][key];
      link += "item=" + item_id;
    } catch (error) {
      if (dev_mode) {
        console.log(error);
        console.log("We're probably looking at a spell.");
      }
    }

    // if it's an item try to add azerite ids and itemlevel
    if (link.indexOf("item") > -1) {
      if (data.hasOwnProperty("class_id") && data.hasOwnProperty("used_azerite_traits_per_item")) {
        link += "/azerite-powers=";
        link += data["class_id"];
        for (const trait of data["used_azerite_traits_per_item"][key]) {
          link += ":" + trait["id"];
        }
      }
      let ilvl = data["simulated_steps"][data["simulated_steps"].length - 1];
      // fix special case of azerite items "1_340"
      if (typeof ilvl === 'string') {
        if (ilvl.indexOf("_") > -1) {
          ilvl = ilvl.split("_")[1];
        }
      }
      link += "&ilvl=" + ilvl;
    }

    try {
      let spell_id = data["spell_ids"][key];
      link += "spell=" + spell_id;
    } catch (error) {
      if (dev_mode) {
        console.log(error);
        console.log("We're probably looking at an item.");
      }
    }

    link += "\">" + key + "</a>";

    return link;
  }

  if (tooltip_origin == "wowdb") {
    let link = "<a href=\"http://www.wowdb.com/";
    try {
      let item_id = data["item_ids"][key];
      link += "items/" + item_id;
    } catch (error) {
      if (dev_mode) {
        console.log(error);
        console.log("We're probably looking at a spell.");
      }
    }

    // if it's an item try to add azerite ids and itemlevel
    if (link.indexOf("items") > -1) {
      // // No Azerite Support yet
      // if (data.hasOwnProperty("class_id") && data.hasOwnProperty("used_azerite_traits_per_item")) {
      //   link += "/azerite-powers=";
      //   link += data["class_id"];
      //   for (const trait of data["used_azerite_traits_per_item"][key]) {
      //     link += ":" + trait["id"];
      //   }
      // }
      let ilvl = data["simulated_steps"][data["simulated_steps"].length - 1];
      // fix special case of azerite items "1_340"
      if (ilvl.indexOf("_") > -1) {
        ilvl = ilvl.split("_")[1];
      }
      link += "?itemLevel=" + ilvl;
    }

    try {
      let spell_id = data["spell_ids"][key];
      link += "spells/" + spell_id;
    } catch (error) {
      if (dev_mode) {
        console.log(error);
        console.log("We're probably looking at an item.");
      }
    }

    link += "\">" + key + "</a>";

    return link;
  }

}

/**
 * Function to update title and subtitle on init error.
 * @param {int} id
 */
function requirements_error(id) {
  chart = bloodmallet_charts[id];
  chart.update(
    {
      title: {
        text: "Error in chart setup"
      },
      subtitle: {
        text: "Missing 'data-wow-class' or 'data-wow-spec'. <a href=\"https://bloodmallet.com\">bloodmallet.com</a>"
      }
    }
  )
}

/**
 * Updates the style of the chart
 */
function update_chart_style(chart) {
  chart.update({
    chart: {
      backgroundColor: background_color
    },
    legend: {
      backgroundColor: background_color,
      itemStyle: {
        color: font_color,
      },
      itemHoverStyle: {
        color: font_color,
      }
    },
    title: {
      style: {
        color: font_color,
      }
    },
    subtitle: {
      style: {
        color: font_color,
      }
    },
    tooltip: {
      formatter: function () {
        let s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
        s += background_color;
        s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">';
        s += this.x;
        s += '</div>';
        let cumulative_amount = 0;
        for (var i = this.points.length - 1; i >= 0; i--) {
          cumulative_amount += this.points[i].y;
          if (this.points[i].y !== 0) {
            s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
              this.points[i].series.color + ';' +
              ' padding-left: 4px;\">' +
              this.points[i].series.name +
              '</span>:&nbsp;&nbsp;' +
              Intl.NumberFormat().format(cumulative_amount) +
              "</div>";
          }
        }
        s += '</div>';
        return s;
      },
      backgroundColor: background_color,
      borderColor: grey_color,
      style: {
        color: font_color,
        fontSize: font_size,
      },
    },
    yAxis: {
      stackLabels: {
        style: {
          color: font_color,
        }
      }
    }
  });
}
