<?php
    $paged = (get_query_var('paged')) ? get_query_var('paged'): 1;
    $projects = new WP_Query(array(
        'post_type' => 'design',
        'post_status' => 'publish',
        'posts_per_page' => 6,
        'order' => 'DESC',
        'paged' => $paged
    ));
    $projCount = 1;
?>
<?php if($projects->have_posts()): ?>

    <?php while($projects->have_posts()): $projects->the_post();
        $projImg = get_the_post_thumbnail(); ?>
        <figure class="gallery__project animated fadeInUpShort" data-id="<?php echo $projCount ?>">
            <img src="<?php the_post_thumbnail_url(); ?>" alt="" class="gallery__project--image" />
            <figcaption class="gallery__project--content">
                <h2 class="gallery__project--header">
                    <a href="<?php the_permalink(); ?>">
                        <?php the_title(); ?>
                    </a>
                </h2>
                <div class="gallery__project--excerpt">
                    <?php the_excerpt(); ?>
                </div>
                <a href="<?php the_permalink(); ?>" class="gallery__project--link no-style">See Project</a>
            </figcaption>
        </figure>
        <?php $projCount++ ?>
    <?php endwhile; ?>

    <nav class="gallery__pagination">
        <span><?php echo get_next_posts_link( 'Older Projects', $projects->max_num_pages ); ?></span>
        <span><?php echo get_previous_posts_link( 'Newer Projects' ); ?></span>
    </nav>
    <?php wp_reset_query(); ?>

<?php else: ?>
    <div class="error-project">
        <p><?php _e( 'The projects loop is broken. I&rsquo;m probably working on it.' ); ?></p>
    </div>
<?php endif; ?>