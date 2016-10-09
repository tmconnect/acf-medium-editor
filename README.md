# Advanced Custom Fields: Medium Editor Field

Suported ACF Versions
* ACF 5

Ever needed to give a client a way to edit the appearence of text without wanting to give them a full blown
WYSIWYG editor? Need something less than a WYSYWIG but more than a text or textarea field that you can configure
the way you need it to work with the features you need it to have?

![Example](https://github.com/Hube2/acf-medium-editor/blob/master/assets/screenshots/example.png)

== Installation ==

1. Copy the `acf-medium-editor-field` folder into your `wp-content/plugins` folder
2. Activate the Medium Editor Field plugin via the plugins admin page
3. Create a new field via ACF and select the Medium Editor Field type
4. Please refer to the description for more info regarding the field type settings

##Configurable Medium Editor WYSIWYG Field for ACF

This add on for ACF5 Pro adds [MediumEditor](https://github.com/yabwe/medium-editor) as an ACF field. Each field
instance is configurable, and each field instance has its own settings. Many of the options 
available in MediumEditor are supported, including the creation of custom buttons using [MediumButton](https://github.com/arcs-/MediumButton). It is also possible using either a configuration
setting or a filter to alter the MediumEditor Theme. Some of the available options are covered below.
For more information on MediumEditor and MediumButton, see the description of these libaries at the links above.

Please note that this is onlly available for the ACF5 Pro verion. It will not work in ACF4. As you'll see looking at
the field settings, I've added a repeater field (and a nested repeater to the settings for this field type.
It may work with ACF4 and with the repeater add on, but the JavaScript would need to be rewritten for that 
and if you're using ACF4 and the repeater add on then you may as will upgrade to ACF5 Pro.

I have created this custom field with specific features of MediumEditor that I need for a project I'm
currently working on. The most important feature is the inclusion of MediumButton so that I can create
custom buttons that will allow me to complete the admin to meet the client's needs for modifying things
like text color of specific portions of text. I'm not apposed to adding more options and features of 
MediumEditor, drop me a note in issues for this repo and I'll consider them.

There are actually several ACF addons that use MediumEditor, but I needed something that I could congifure
differently for each instance and I especially needed to be able to easily add custom buttons and the 
easiest way to do that was with MediumButton. I couldn't find one and honestly, editing any of the existing
ones to allow what I needed would have mean completely rebuilding them anyway. So this is my take on it. 
Hopefully others find it usefull.


## Field Settings
See Setting Descriptions Below Screenshot
![Field Settings](https://github.com/Hube2/acf-medium-editor/blob/master/assets/screenshots/field-settings.png)

The following is an explanation of the fields, not including the ones that should be self explanatory.

**Buttons:** These are the buttons that are included in [MediumEditor](https://github.com/yabwe/medium-editor#buttons).
Select the buttons you want to include in each editor instance.

**Custom Buttons:** This is the main reason that I created this plugin. This field supports adding custom buttons
using [MediumButton](https://github.com/arcs-/MediumButton#html-buttons). Please note that if any of the main fields
(Name, Label, HTML Tag) are empty that the entire button will be ignored.

*Name*: This is then name of the button and will be used when instaniating the MediumButton Object. The button
name must be unique and cannot be one of the buttons already included in MediumEditor.
I do not know what the effects of custom characters in the name will be. Please report any bugs and I will
look into adding something to clean up characters or find some other work-around for any that cause errors.

*Label*: This is the label that will appear in the button bar. This field allows HTML. Please make sure it is valid
HTML, invalid markup will probably break the button bar. MediumButton also supports using icons for buttons.
If you want to use icons in your buttons then it is your responsibility to make sure the icon font set is
available for use in the admin of your site.

*HTML Tag*: Enter the html tag that will be inserted by this button. Only non-empty html tags are allowed.
Most valid HTML tags are supported. If an invalid HTML tag is entered then the button will be ignored.

I'm not sure at this time what effect some of the tags will have in the editor. I haven't tried them all
if you run into issues let me know and I'll need to make a decision on wheter to try to fix it or remove
the tag(s) from the allowed list.

The supported tags are:

* abbr
* acronym
* address
* article
* asside
* b
* bdi
* bdo
* blockquote
* button
* caption
* cite
* code
* dd
* del
* details
* dfn
* div
* dl
* dt
* em
* figcaption
* figure
* footer
* h1
* h2
* h3
* h4
* h5
* h6
* header
* i
* ins
* li
* main
* mark
* meta
* ol
* p
* pre
* q
* s
* samp
* section
* small
* span
* strong
* sub
* sup
* summary
* table
* tbody
* td
* tfoot
* th
* thead
* time
* tr
* u
* ul
* var
* wbr

*Attributes*: Add attributes to the html tag. Attibute names must be valid (they must beging with a letter and
contain only letter, numbers, underscores and dashes. Attribute values must not contain double quotes (")
any attributes that do not conform to these rules will be ignored.

**Other MediumEditor Options:** This is a selection of other
[Core Options](https://github.com/yabwe/medium-editor#core-options) available for MediumEditor. Please see
the MediumEditor documentation for information on each option. Selecting an option will set that option's
value to true.

## MediumEditor Themes
MediumEditor fields will use the default theme unless you change it. You can alter the theme used for all 
MediumEditor fields in two ways.

1) wp-config.php
Add the following code to your wp-cofig.php file
```
define('MEDIUM_EDITOR_THEME', 'theme-name');
```

2) filter
Add the following code to your functions.php file or wherever you would add such a filter
```
add_filter('medium-editor-theme', 'my_medium_editor_theme_function');
function my_medium_editor_theme_function($theme) {
  $theme = 'beagle';
  return $theme;
}
```

Theme names in the above code is one of the following themes currently supported by MediumEditor:
* beagle
* bootstrap
* default
* flat
* mani
* roman
* tim

For more information see [MediumEditor](https://github.com/yabwe/medium-editor#mediumeditor) and
[MediumButton](https://github.com/arcs-/MediumButton#mediumbutton)

#### Automatic Updates
Install [GitHub Updater](https://github.com/afragen/github-updater) on your site if you want to recieve automatic
updates for this plugin.

#### Remove Nag
You may notice that I've started adding a little nag to my plugins. It's just a box on some pages that lists my
plugins that you're using with a request do consider making a donation for using them. If you want to disable them
add the following filter to your functions.php file.
```
add_filter('remove_hube2_nag', '__return_true');
```