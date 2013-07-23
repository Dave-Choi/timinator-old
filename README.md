# Timinator

### An Ember-Rails app designed for speedcubing analytics.

A live version currently without any data persistence exists here:
http://timinator.herokuapp.com

## Table of Contents
* [Motivation](#motivation)
* [Discussion of Current Features](#discussion-of-current-features)
  * [Method Selection](#method-selection)
  * [Step by Step Timing](#step-by-step-timing)
  * [Time Differences](#time-differences)
  * [Retrying Scrambles](#retrying-scrambles)
  * [Trash](#trash)
* [Planned Features by Priority](#planned-features-by-priority)

### Motivation

Cube solving methods are generally broken up into named steps that do some sort of set up, or put part of the puzzle into a solved state, which later steps preserve, until you end up with a solved cube.

Existing timers generally only track your overall solve time, and provide weak means of analysis with respect to method breakdowns, lacking a way to track your progress per step over time.  Figuring out what you need to practice is one of the keys to improvement, and this app aims to address that.

Some timers provide statistics such as standard deviations, which I don't believe really add value, in that I don't see how seeing your standard deviation would lead you to make any decision guiding your practice.  Likewise, a common feature is an average over N solves, after discarding the high and the low time.  If anything, I believe that high and low times are the ones that should be scrutinized the most.  These features can help you figure out where you are, but I'd like this timer to stay focused on figuring out where you should be headed, and will attempt to avoid adding anything that doesn't help toward that end.

---

### Discussion of Current Features

#### Method Selection

Some placeholder method selection is available at the top.  The current options are "No Breakdown", CFOP and Roux.  Clicking on a method will set up the table template, reset all times, and empty the graph.  These will be renamed in the near future to accomodate intermethod steps.

#### Step by Step Timing

Hitting the "Step" button, or spacebar, will step the timer through the different steps of your method.  Times will be tracked by step and listed on a table, and plotted on a graph below.  The graph my be displayed as stacked areas, centered areas (stream), or expanded to view percentages.  The colored areas representing the steps may be clicked on to isolate them, and the names on the upper right can be clicked on to toggle a step's display.

Reduced overall solve time is always the fundamental goal, but looking at times by step allows you to focus your practice where your time would be spent most efficiently, by working on the steps with the greatest potential gain.

Some method's steps cross over to other methods (e.g. Cross, CxLL), and the plan is to track steps independently, so a beginner's Cross statistics carry over if they transition to the CFOP method.

#### Time Differences

Logged times have differences calculated with respect to the session average, broken down by step, and are displayed in parentheses next to a step's time.  Red when slower than average, green when faster.  This allows you to see at a glance where you're deviating, and can give you an idea of what corner cases you need to practice, for example.

#### Retrying Scrambles

Hovering over a row in the table of logged times will show the scramble as a tooltip.  You can load the scramble for your next solve by clicking on the random/shuffle icon on the left side of the row.

The early stages of a solve are usually the ones that have the greatest overall impact on solve time.  i.e. A world record holder's CFOP O(rient) and P(ermute) algorithm executions are only going to be a little better than anyone else's, but their C(ross) and F2L will be significantly faster.  Being able to retry a given scramble on a bad solve will really help to iron out issues with cases you struggle with.

#### Trash

You can trash a logged result by clicking on the trash can icon on the left side of the row.  It will fade out the row, and recalculate averages and redraw the graph without the trashed result.  There's currently no data persistence, but in the future, you'll have until the end of your session to click the trash can icon again to untrash it.  Trashed results will not be persisted on the server.

Sometimes you have a bad solve because you got a phone call, or dropped the cube, or whatever, and it has nothing to do with your performance, and the time shouldn't affect your averages or be plotted on your progress.  Other times, you'll have a bad solve that was totally your fault, or a lucky solve that let you skip two steps, and you'd like to see your results without those outliers.  You can toggle trashed for either case.

---

### Planned Features by Priority
* Data persistence
* Display modes (e.g. percentages, mm:ss time display, etc.)
* Countdown
* Audio feedback for step progression and countdown
* Method assembly/forking
* Aggregated stats to look at things like average percentage breakdowns across all users. e.g. What percentage of solve time is spent on F2L on average?
