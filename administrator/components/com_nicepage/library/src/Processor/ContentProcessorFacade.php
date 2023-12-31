<?php
/**
 * @package   Nicepage Website Builder
 * @author    Nicepage https://www.nicepage.com
 * @copyright Copyright (c) 2016 - 2019 Nicepage
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */

namespace NP\Processor;

defined('_JEXEC') or die;

class ContentProcessorFacade
{
    private $_isPulic;
    private $_pageId;
    private $_options;

    /**
     * ContentProcessorFacade constructor.
     *
     * @param bool   $isPublic Is public content
     * @param string $pageId   Page id
     * @param null   $options  Site Settings
     */
    public function __construct($isPublic = true, $pageId = '', $options = null)
    {
        $this->_isPulic = $isPublic;
        $this->_pageId = $pageId;
        $this->_options = $options;
    }

    /**
     * Process content
     *
     * @param string $content Page content
     *
     * @return mixed|string|string[]|null
     */
    public function process($content)
    {
        $common = new CommonProcessor();
        $content = $common->processDefaultImage($content);
        if ($this->_isPulic) {
            $content = $common->processForm($content, $this->_pageId);
            $content = $common->processCustomPhp($content);
            $content = $common->processGoogleMaps($content);
            $content = ControlsProcessor::process($content, $this->_options);

            $blog = new BlogProcessor($this->_pageId);
            $content = $blog->process($content);

            $products = new ProductsProcessor($this->_pageId);
            $content = $products->process($content);

            $shoppingCart = new ShoppingCartProcessor();
            $content = $shoppingCart->process($content);
        }
        $content = PositionsProcessor::process($content);
        return $content;
    }
}
