## How to call Php Constants in pages

<?= APP_NAME ?>
<?= SITE_URL ?>
<?= CONTACT_EMAIL ?>
<?= SEO_DEFAULT_TITLE ?>


<script>
    const APP_NAME = <?= json_encode(APP_NAME) ?>;
    const SITE_URL = <?= json_encode(SITE_URL) ?>;
</script>


<script>
    window.APP_CONFIG = <?= json_encode([
        'name' => APP_NAME,
        'url'  => SITE_URL,
        'env'  => APP_ENV,
    ]) ?>;
</script>