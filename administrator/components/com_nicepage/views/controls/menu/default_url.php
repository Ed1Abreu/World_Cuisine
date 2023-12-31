<?php
/**
 * @package   Nicepage Website Builder
 * @author    Nicepage https://www.nicepage.com
 * @copyright Copyright (c) 2016 - 2019 Nicepage
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */
defined('_JEXEC') or die;

use Joomla\CMS\Filter\OutputFilter;
use NP\Utility\Theme;

$linkClassName = isset($linkClassName) ? $linkClassName : '';
$linkInlineStyles = isset($linkInlineStyles) ? $linkInlineStyles : '';
$linkActiveClass = isset($itemIsCurrent) && $itemIsCurrent ? 'active' : '';
$attributes = array(
    'class' => array($linkClassName, $item->anchor_css, $linkActiveClass),
    'title' => $item->anchor_title,
    'href' => OutputFilter::ampReplace(htmlspecialchars($item->flink)),
    'style' => $linkInlineStyles);

switch ($item->browserNav) {
case 1:
    // _blank
    $attributes['target'] = '_blank';
    break;
case 2:
    // window.open
    $attributes['onclick'] = 'window.open(this.href,\'targetWindow\','
        . '\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes\');return false;';
    break;
}

$title = '<span>' . $item->title . '</span>';

$linktype = $item->menu_image
    ? ('<img src="' . $item->menu_image . '" alt="' . $item->title . '" />'
        . ($itemParams->get('menu_text', 1) ? $title : ''))
    : $title;

echo Theme::funcTagBuilder('a', $attributes, $linktype);