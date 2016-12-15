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
                
                <?php if( have_rows('project_header') ): ?>
                    <header class="project-header">
                        <?php while( have_rows('project_header') ): the_row(); 
                            // vars
                            $banner = get_sub_field('proj_banner');
                            $sub = get_sub_field('proj_subheader');
                            $btnType = get_sub_field('proj_type');
                            $wurl = get_sub_field('proj_link_url');
                            $aurl = get_sub_field('proj_type_article');
                            $burl = get_sub_field('proj_type_blog');
                            ?>
                            <figure class="project-banner animatedParent animateOnce" data-sequence="100" style="background-image: url(<?php echo $banner['url'] ?>);">
                                
                                <h1 class="project-title animated fadeInUpShort" data-id="1"><?php the_title(); ?></h1>
                                
                                <?php if($sub): ?>
                                    <h2 class="proj-dates animated fadeInUpShort" data-id="2"><?php echo $sub ?></h2>
                                <?php endif; ?>
                                
                                <div class="project-button animated fadeInRightShort" data-id="3">
                                    <?php if($btnType == ''): ?>
                                        <a href="#article" class="btn scroll">Read More</a>
                                    <?php elseif($btnType == 'website'): ?>
                                        <a href="<?php echo $wurl ?>" target="_blank" class="btn">View Site</a>
                                    <?php elseif($btnType == 'article'): ?>
                                        <a href="<?php echo $aurl ?>" target="_blank" class="btn">Article</a>
                                    <?php elseif($btnType == 'post'): ?>
                                        <a href="<?php echo $burl ?>" class="btn"></a>
                                    <?php endif; ?>
                                </div>
                                
                            </figure>
                            <?php
                                if ( function_exists('yoast_breadcrumb') ) 
                                {yoast_breadcrumb('<p id="breadcrumbs">','</p>');}
                            ?>
                        <?php endwhile; ?>
                    </header>
                <?php endif; ?>
                
                <?php if(have_rows('project_specs')): ?>
                    <article id="article">
                        <?php while(have_rows('project_specs')): the_row();
                            
                            if(get_row_layout() == 'detail_text'): ?>
                                <section class="project-description">
                                    <?php the_sub_field('text'); ?>
                                </section>
                                
                            <?php elseif(get_row_layout() == 'detail_gallery'):
                                $images = get_sub_field('images');
                                $counter = 1;
                                if($images): ?>
                                <section class="project-gallery animatedParent animateOnce" data-sequence="100" data-appear-top="-100">
                                    <?php foreach($images as $image): ?>
                                        <figure class="animated fadeInUpShort" data-id="<?php echo $counter ?>">
                                             <a href="<?php echo $image['url']; ?>" class="imgbox" data-set="gallery"<?php if($image['caption']): ?> data-caption="<?php echo $image['caption'] ?>"<?php endif; ?>>
                                                <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
                                            </a>
                                        </figure>
                                        <?php $counter++; ?>
                                    <?php endforeach; ?>
                                </section>
                                <?php endif;
                                
                            elseif(get_row_layout() == 'detail_fixed'):
                                $bg = get_sub_field('bg_image');
                                $height = get_sub_field('bg_height'); ?>
                                <section class="project-background" style="background-image: url('<?php echo $bg ?>');<?php if($height): ?> height: <?php echo $height ?>px;<?php endif; ?>"></section>
                                
                            <?php elseif(get_row_layout() == 'detail_image'):
                                $img = get_sub_field('image');
                                if(!empty($img)):
                                ?>
                                    <section class="project-image animatedParent animateOnce">
                                        <img src="<?php echo $img['url']; ?>" alt="<?php echo $img['alt']; ?>" class="animated fadeInUpShort" />
                                    </section>
                                <?php endif; ?>
                            <?php endif;
                            
                        endwhile; ?>
                    </article>
                <?php endif; ?>
                
                <?php if( have_rows('project_deets') ): ?>
                    <aside class="project-specs">
                        <h4>Additional Project Details</h4>
                        <ul>
                            <?php
                                while( have_rows('project_deets') ): the_row();
                                
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
                            ?>
                            
                            <?php if($start or $end): ?>
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
                
            </section>
            
		</main><!-- #main -->
	</div><!-- #primary -->
    
<?php get_footer();