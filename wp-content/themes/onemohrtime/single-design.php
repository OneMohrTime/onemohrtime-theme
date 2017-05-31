<?php
/**
 * The template for displaying project posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package onemohrtime
 */

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        
        <section class="project">
            
            <?php if(have_rows('project_header')): ?>
            <header class="project__header">
                
                <?php while(have_rows('project_header')): the_row(); 
                
                $projBanner = get_sub_field('proj_banner');
                $projSub = get_sub_field('proj_subheader'); ?>
                
                <figure class="project__banner animatedParent animateOnce" data-sequence="100" style="background-image: url(<?php echo $projBanner['url'] ?>);">
                    
                    <?php if($projSub): ?>
                        <h2 class="project__subtitle"><?php echo $projSub ?></h2>
                    <?php endif; ?>
                    
                    <h1 class="project__title">
                        <div id="typed-strings">
                            <?php the_title('<p class="screen-reader-text">','</p>'); ?>
                        </div>
                        <span id="typed"></span>
                    </h1>
                    
                    <?php if(function_exists('yoast_breadcrumb')): {
                        yoast_breadcrumb('<div id="breadcrumbs" class="project__breadcrumb">','</div>');
                    } endif; ?>
                    <?php endwhile; ?>
                    
                </figure>
                
            </header>
            <?php endif; ?>
            
            <?php if(have_rows('project_specs')): ?>
            <article id="article" class="project__story">
                
                <?php while(have_rows('project_specs')): the_row();
                
                // TEXT
                if(get_row_layout() == 'detail_text'): ?>
                <div class="project__section project__text wysiwyg">
                    <?php the_sub_field('text'); ?>
                </div>
                
                <?php
                // TEXT/IMAGE
                elseif(get_row_layout() == 'detail_text_image'):
                $detailText = get_sub_field('text');
                $detailImg = get_sub_field('image');
                $detailReverse = get_sub_field('reverse');
                ?>
                <div class="project__section project__text-image<?php if($detailReverse == '1'): ?> project__text-image--reversed<?php endif; ?>">
                    <div class="content--half wysiwyg">
                        <?php echo $detailText ?>
                    </div>
                    <figure class="image--half">
                        <img src="<?php echo $detailImg['sizes']['thumbnail'] ?>" alt="<?php echo $detailImg['alt'] ?>" srcset="<?php echo $detailImg['sizes']['medium'] ?> 1024w, <?php echo $detailImg['sizes']['large'] ?> 1440w, <?php echo $detailImg['url'] ?> 1920w" />
                    </figure>
                </div>
                
                <?php
                // IMAGE
                elseif(get_row_layout() == 'detail_image'):
                $display = get_sub_field('display');
                $standard = $display == 'standard';
                $wide = $display == 'wide';
                $fixed = $display == 'fixed';
                $image = get_sub_field('image');
                ?>
                
                <?php if($standard): ?>
                <div class="project__section project__image project__image--default">
                <?php elseif($wide): ?>
                <div class="project__section project__image project__image--wide">
                <?php elseif($fixed): ?>
                <div class="project__section project__image project__image--fixed" style="background-image: url(<?php echo $image['url'] ?>);">
                <?php endif; ?>
                    <?php if($standard or $wide): ?>
                    <img src="<?php echo $image['sizes']['thumbnail'] ?>" alt="<?php echo $image['alt'] ?>" srcset="<?php echo $image['sizes']['medium'] ?> 1024w, <?php echo $image['sizes']['large'] ?> 1440w, <?php echo $image['url'] ?> 1920w" />
                    <?php endif; ?>
                </div>
                
                <?php
                // GALLERY
                elseif(get_row_layout() == 'detail_gallery'):
                $images = get_sub_field('images');
                $counter = 1;
                if($images):
                ?>
                <div class="project__section project__gallery animatedParent animateOnce">
                    <?php foreach($images as $image): ?>
                        <figure class="animated fadeInUpShort" data-id="<?php echo $counter ?>">
                             <a href="<?php echo $image['url']; ?>" class="strip" data-strip-group="gallery"<?php if($image['caption']): ?> data-strip-caption="<?php echo $image['caption'] ?>"<?php endif; ?>>
                                <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
                            </a>
                        </figure>
                        <?php $counter++; ?>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
                
                <?php endif; // end ACF Flexible Field
                
                endwhile; ?>
            </article>
            <?php endif; ?>
            
            <?php if(have_rows('project_deets')): ?>
                <aside class="project-specs">
                    <h4>Additional Project Details</h4>
                    <ul class="wysiwyg">
                        <?php while(have_rows('project_deets')): the_row();
                        
                        $start = get_sub_field('proj_start');
                        $end = get_sub_field('proj_end');
                        $roles = get_sub_field('proj_roles');
                        $employer = get_sub_field('proj_employer');
                        $client = get_sub_field('proj_client');
                        $codes = get_sub_field('proj_code');
                        $cms = get_sub_field('proj_cms');
                        $team = get_sub_field('proj_team');
                        $photog = get_sub_field('proj_photog');
                        $printer = get_sub_field('proj_printer');
                        
                        $cmsTitle = get_sub_field_object('proj_cms', 'label');
                        
                        if($start or $end): ?>
                            <li>Time Span</li>
                            <?php if($start == $end): ?>
                                <li><?php echo $end ?></li>
                            <?php elseif($start != $end): ?>
                                <li><?php echo $start . ' &ndash; ' . $end ?></li>
                            <?php endif;
                        endif; ?>
                        
                        <?php if($roles): ?>
                        <li>Roles</li>
                        <li>
                            <?php foreach($roles as $role): ?>
                                <span><?php echo $role ?></span>
                            <?php endforeach; ?>
                        </li>
                        <?php endif; ?>
                        
                        <?php if($employer): ?>
                        <li>Employer</li>
                        <li><?php echo $employer ?></li>
                        <?php endif; ?>
                        
                        <?php if($client): ?>
                        <li>Client</li>
                        <li><?php echo $client ?></li>
                        <?php endif; ?>
                        
                        <?php if($codes): ?>
                        <li>Coding Languages</li>
                        <li>
                            <?php foreach($codes as $code): ?>
                                <span><?php echo $code ?></span>
                            <?php endforeach; ?>
                        </li>
                        <?php endif; ?>
                        
                        <?php if($cms): ?>
                        <li>Content Management System</li>
                        <li>
                            <?php echo $cms ?>
                        </li>
                        <?php endif; ?>
                        
                        <?php if($team): ?>
                        <li>Team</li>
                        <li><?php echo $team ?></li>
                        <?php endif; ?>
                        
                        <?php if($photog): ?>
                        <li>Photographer</li>
                        <li><?php echo $photog ?></li>
                        <?php endif; ?>
                        
                        <?php if($printer): ?>
                        <li>Printer</li>
                        <li><?php echo $printer ?></li>
                        <?php endif; ?>
                        
                        <?php endwhile; ?>
                    </ul>
                </aside>
            <?php endif; ?>
            
        </section><!-- /.project -->
        
    </main><!-- /.site-main -->
</div><!-- /.content-area -->

<?php get_footer();